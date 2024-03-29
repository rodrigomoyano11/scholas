/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, lastValueFrom, zip } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import {
  Auth,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAdditionalUserInfo,
  getIdToken,
  getIdTokenResult,
  GoogleAuthProvider,
  idToken,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  user,
} from '@angular/fire/auth'
import { convertDate } from 'src/app/core/utils/convertDate'
import { ErrorService } from '../error/error.service'
import { User } from 'src/app/core/models/user.interface'
import { convertPhoneNumber } from 'src/app/core/utils/convertPhoneNumber'
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserResponse,
  GetUserIdResponse,
} from 'src/app/core/models/api.interface'

import { UpdateAccountDetailsForm } from '../../containers/update-account-details/update-account-details.component'
import { LocationService } from 'src/app/core/services/location/location.service'
import { DialogComponent, DialogData } from 'src/app/core/components/dialog/dialog.component'
import { MatDialog } from '@angular/material/dialog'

export type Provider = 'google' | 'facebook' | 'email'

export interface ExtraDataSentForm {
  birthday: string
  phoneNumber: string
  province: string
  locality: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _defaultData: User = {
    uid: '',
    displayName: null,
    photoURL: null,
    email: null,
    token: null,
    isLogged: false,
    isEmailVerified: false,
    claims: null,
    extraData: null,
  }
  private _userData: User = this._defaultData
  private _user = this.auth.currentUser

  private _displayName: User['displayName'] = null

  user$: BehaviorSubject<User> = new BehaviorSubject(this._defaultData)

  constructor(
    private auth: Auth,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private errorHandler: ErrorService,
    private location: LocationService,
    private dialog: MatDialog,
  ) {
    this.user$.next(this._defaultData)

    this._getUserData()
  }

  // Login/Register Methods
  async register(provider: Provider, email = '', password = '', displayName = ''): Promise<void> {
    if (displayName !== '') this._displayName = displayName

    await this.login(provider, email, password, true)
  }

  async login(provider: Provider, email = '', password = '', isNewUser = false): Promise<void> {
    try {
      // Login methods
      const methods = {
        google: () => signInWithPopup(this.auth, new GoogleAuthProvider()),
        facebook: () => signInWithPopup(this.auth, new FacebookAuthProvider()),
        email: () =>
          isNewUser
            ? createUserWithEmailAndPassword(this.auth, email, password)
            : signInWithEmailAndPassword(this.auth, email, password),
      }
      const credential = await methods[provider]()

      // Token operations
      const token = await getIdToken(credential.user)
      localStorage.setItem('token', token)
      const isVerifiedToken = await this.verifyToken(token)
      if (!isVerifiedToken) return this.logout()

      // Display upgrade
      this._displayName = credential.user.displayName

      // User Registration
      const { claims, uid } = await lastValueFrom(this.user$.pipe(take(1)))
      isNewUser = getAdditionalUserInfo(credential)?.isNewUser ?? false
      if (isNewUser) {
        // Permissions
        if (claims && !claims.admin) await this.setPermissions('donor', uid)

        // User Creation in DB
        const isUserCreated = await this._createUser(uid)
        if (!isUserCreated) return console.error('Auth: User not created')
      }

      // Verifications
      const isExtraDataComplete = await this._verifyExtraDataCompleted(uid)
      if (!isExtraDataComplete) return void this.router.navigate(['/auth/extra-data'])

      // Completed registration operations
      void this.setUserId()
      await this.router.navigate(['/'])
      return void this._verifyEmail()
    } catch (error: any) {
      error.code
        ? this.errorHandler.openDialog(error.code as string)
        : this.errorHandler.openDialog(typeof error === 'string' ? error : JSON.stringify(error))
    }
  }

  // Verifications
  async verifyToken(token: User['token']): Promise<boolean> {
    try {
      if (!token) return false

      return lastValueFrom(
        this.http
          .get<never>(`${environment.apiUrl}/auth/${token}`)
          .pipe(map(({ body }) => !!body && body !== 'Token is invalid')),
      )
    } catch (error: any) {
      error.code
        ? this.errorHandler.openDialog(error.code as string)
        : this.errorHandler.openDialog(typeof error === 'string' ? error : JSON.stringify(error))

      return false
    }
  }

  private async _verifyEmail(): Promise<void> {
    try {
      const { isEmailVerified } = await lastValueFrom(this.user$.pipe(take(1)))

      if (isEmailVerified || !this._user) return

      setTimeout(() => {
        this.snackBar
          .open('Acordate de verificar tu correo electrónico', 'Hacerlo ahora')
          .onAction()
          .pipe(take(1))
          .subscribe(
            () =>
              this._user &&
              void sendEmailVerification(this._user).then(() =>
                this.router.navigate(['/auth/verify-email']),
              ),
          )
      }, 3000)
    } catch (error: any) {
      error.code
        ? this.errorHandler.openDialog(error.code as string)
        : this.errorHandler.openDialog(typeof error === 'string' ? error : JSON.stringify(error))
    }
  }

  private async _verifyExtraDataCompleted(uid: User['uid']): Promise<boolean> {
    try {
      const response = await lastValueFrom(
        this.http.get<GetUserResponse>(`${environment.apiUrl}/users/${uid}`),
      )

      if (!response.email) {
        await this.logout()
        return false
      }

      const { province, locality, phoneNumber, birthday } = response

      return !!(province && locality && phoneNumber && birthday !== '1900-01-01')
    } catch (error: any) {
      error.code
        ? this.errorHandler.openDialog(error.code as string)
        : this.errorHandler.openDialog(typeof error === 'string' ? error : JSON.stringify(error))

      return false
    }
  }

  // User data operations
  private _getUserData(): void {
    try {
      const idToken$ = idToken(this.auth)
      const currentUser$ = user(this.auth)

      zip(idToken$, currentUser$).subscribe(([token, currentUser]) => {
        if (!token || !currentUser) {
          this.user$.next(this._defaultData)
          return
        }

        void getIdTokenResult(currentUser).then(({ claims, token }) => {
          localStorage.setItem('token', token)

          localStorage.setItem('claims', claims.admin ? 'admin' : 'donor')

          const { uid, displayName, photoURL, email, phoneNumber, emailVerified } = currentUser

          this._userData = {
            uid,
            displayName,
            photoURL,
            email,
            token,
            claims,
            isLogged: !!token,
            isEmailVerified: emailVerified,
            extraData: {
              birthday: '1900-01-01',
              phoneNumber,
              location: null,
            },
          }

          this._user = currentUser

          this.user$.next(this._userData)
        })
      })
    } catch (error: any) {
      error.code
        ? this.errorHandler.openDialog(error.code as string)
        : this.errorHandler.openDialog(typeof error === 'string' ? error : JSON.stringify(error))
    }
  }

  private async _createUser(uid: User['uid']): Promise<boolean> {
    try {
      const body = {
        displayName: this._displayName,
        birthday: '1900-01-01',
        province: 1,
        locality: null,
        phoneNumber: null,
      }

      const response = await lastValueFrom(
        this.http.post<CreateUserResponse>(`${environment.apiUrl}/users/?uid=${uid}`, body),
      )

      return !!response?.id
    } catch (error: any) {
      error.code
        ? this.errorHandler.openDialog(error.code as string)
        : this.errorHandler.openDialog(typeof error === 'string' ? error : JSON.stringify(error))

      return false
    }
  }

  private async _sendUserData(uid: User['uid'], body: CreateUserRequest): Promise<boolean> {
    const response = await lastValueFrom(
      this.http.put(
        `${environment.apiUrl}/users/?uid=${uid}`,
        { ...body, province: await this.location.getIdByProvince(body.province) },
        {
          responseType: 'text',
        },
      ),
    )

    return response === 'Usuario actualizado'
  }

  async editAccountDetails(data: UpdateAccountDetailsForm): Promise<void> {
    try {
      const { fullName, birthday, province, locality, phoneNumber } = data

      const { uid } = await lastValueFrom(this.user$.pipe(take(1)))

      const body = {
        displayName: fullName,
        birthday: convertDate(birthday),
        province: await this.location.getIdByProvince(province),
        locality,
        phoneNumber: convertPhoneNumber(phoneNumber),
      }

      await lastValueFrom(
        this.http.put(`${environment.apiUrl}/users/?uid=${uid}`, body, {
          responseType: 'text',
        }),
      )

      await this._updateUser()
    } catch (error: any) {
      error.code
        ? this.errorHandler.openDialog(error.code as string)
        : error.error
        ? this.errorHandler.openDialog(error.error as string)
        : this.errorHandler.openDialog(typeof error === 'string' ? error : JSON.stringify(error))
    }
  }

  async sendExtraData(extraData: ExtraDataSentForm): Promise<void> {
    try {
      const { birthday, phoneNumber, province, locality } = extraData

      const { uid, displayName } = await lastValueFrom(this.user$.pipe(take(1)))

      await this._sendUserData(uid, {
        displayName,
        birthday: convertDate(birthday),
        province,
        locality,
        phoneNumber: convertPhoneNumber(phoneNumber),
      })

      this.snackBar.open('Tu cuenta ha sido creada correctamente', 'Cerrar', { duration: 5000 })

      await this.router.navigate(['/'])
      return void this._verifyEmail()
    } catch (error: any) {
      error.code
        ? this.errorHandler.openDialog(error.code as string)
        : error.error
        ? this.errorHandler.openDialog(error.error as string)
        : this.errorHandler.openDialog(typeof error === 'string' ? error : JSON.stringify(error))
    }
  }

  // Permissions and Claims

  async setPermissions(type: 'donor' | 'admin', uid: User['uid']): Promise<void | boolean> {
    try {
      const body = type === 'admin' ? { admin: true, donor: false } : { admin: false, donor: true }
      await lastValueFrom(
        this.http.put<User['claims']>(`${environment.apiUrl}/users/claims/${uid}`, body),
      )

      void this._updateUser()

      return true
    } catch (error: any) {
      if (error.error.code) {
        this.errorHandler.openDialog(
          error.error.detail === 'No user record found for the given identifier (USER_NOT_FOUND).'
            ? 'No se ha encontrado un usuario que corresponda con el correo ingresado'
            : (error.code as string),
        )
      } else this.errorHandler.openDialog(typeof error === 'string' ? error : JSON.stringify(error))

      return false
    }
  }

  // Verifications

  async isTokenVerified(): Promise<boolean> {
    const token = localStorage.getItem('token')
    return await this.verifyToken(token)
  }

  async verifyAdminClaim(): Promise<boolean> {
    const { uid } = await lastValueFrom(this.user$.pipe(take(1)))

    const response = await lastValueFrom(
      this.http
        .get<never>(`${environment.apiUrl}/auth/claims?uid=${uid}`)
        .pipe(map(({ body }) => body)),
    )

    return response
  }

  async userIsLogged(): Promise<boolean> {
    return !!(await this.isTokenVerified())
  }

  async userIsAdmin(): Promise<boolean> {
    const claims = localStorage.getItem('claims')
    if (claims !== 'admin') return false
    return await this.verifyAdminClaim()
  }

  async userIsDonor(): Promise<boolean> {
    const claims = localStorage.getItem('claims')
    if (claims !== 'donor') return false
    return await this.isTokenVerified()
  }

  // Others operations

  async logout(): Promise<void> {
    try {
      await this.auth.signOut()
      localStorage.removeItem('token')
      localStorage.removeItem('claims')
      localStorage.removeItem('userId')
      this._displayName = null
      this.snackBar.open('Se ha cerrado tu sesión correctamente', 'Cerrar', { duration: 5000 })
      return void this.router.navigate(['/'])
    } catch (error: any) {
      error.code
        ? this.errorHandler.openDialog(error.code as string)
        : this.errorHandler.openDialog(typeof error === 'string' ? error : JSON.stringify(error))
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email)

      this.snackBar.open(
        `En ${email} recibirás un correo electrónico con un enlace para restablecer tu contraseña`,
        'Cerrar',
        { duration: 5000 },
      )

      return void this.router.navigate(['/'])
    } catch (error: any) {
      error.code
        ? this.errorHandler.openDialog(error.code as string)
        : this.errorHandler.openDialog(typeof error === 'string' ? error : JSON.stringify(error))
    }
  }

  async deleteUser(): Promise<void> {
    const isApproved = (await lastValueFrom(
      this.dialog
        .open<DialogComponent, DialogData>(DialogComponent, {
          data: {
            actions: ['No', 'Sí, eliminar'],
            title: '',
            description: '¿Estás seguro de que quieres eliminar tu cuenta?',
          },
        })
        .afterClosed(),
    )) as boolean
    if (!isApproved) return

    await this.auth.signOut()
    localStorage.removeItem('token')
    localStorage.removeItem('claims')
    this.snackBar.open('Tu cuenta ha sido eliminada correctamente', 'Cerrar', { duration: 5000 })
    return void this.router.navigate(['/'])
  }

  async _updateUser(): Promise<void> {
    if (this._user) {
      const token = await getIdToken(this._user, true)
      localStorage.setItem('token', token)
    }
  }

  async setUserId(): Promise<void> {
    const uid = (await lastValueFrom(this.user$.pipe(take(1)))).uid
    const { id } = await lastValueFrom(
      this.http.get<GetUserIdResponse>(`${environment.apiUrl}/users/${uid}`),
    )
    localStorage.setItem('userId', id.toString())
  }
}
