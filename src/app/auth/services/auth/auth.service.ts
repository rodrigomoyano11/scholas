/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, zip } from 'rxjs'
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
import { convertDate } from 'src/app/shared/utils/convertDate'
import { ErrorService } from '../error/error.service'
import { User } from 'src/app/shared/models/user.interface'
import { convertPhoneNumber } from 'src/app/shared/utils/convertPhoneNumber'
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserResponse,
} from 'src/app/shared/models/api.interface'

export type Provider = 'google' | 'facebook' | 'email'

interface ExtraDataSent {
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
      const methods = {
        google: () => signInWithPopup(this.auth, new GoogleAuthProvider()),
        facebook: () => signInWithPopup(this.auth, new FacebookAuthProvider()),
        email: () =>
          isNewUser
            ? createUserWithEmailAndPassword(this.auth, email, password)
            : signInWithEmailAndPassword(this.auth, email, password),
      }

      const credential = await methods[provider]()
      isNewUser = getAdditionalUserInfo(credential)?.isNewUser ?? false

      const token = await getIdToken(credential.user)
      const isVerifiedToken = await this._verifyToken(token)

      if (!isVerifiedToken) return this.logout()

      const { claims, uid } = await this.user$.pipe(take(1)).toPromise()

      this._displayName = credential.user.displayName

      if (isNewUser) {
        if (claims && !claims.admin) await this.setPermissions('donor', uid)
        const isUserCreated = await this._createUser(uid)
        if (!isUserCreated) return this.deleteUser()
      }
      const isExtraDataComplete = await this._verifyExtraDataCompleted(uid)
      if (!isExtraDataComplete) return void this.router.navigate(['/auth/extra-data'])

      await this.router.navigate(['/'])
      return void this._verifyEmail()
    } catch (error: any) {
      error.code
        ? this.errorHandler.openDialog(error.code)
        : this.errorHandler.openDialog(typeof error === 'string' ? error : JSON.stringify(error))
    }
  }

  // Verifications

  private async _verifyToken(token: User['token']): Promise<boolean> {
    try {
      if (!token) return false

      return this.http
        .get<never>(`${environment.apiUrl}/auth/${token}`)
        .pipe(map(({ body }) => !!body && body !== 'Token is invalid'))
        .toPromise()
    } catch (error: any) {
      error.code
        ? this.errorHandler.openDialog(error.code)
        : this.errorHandler.openDialog(typeof error === 'string' ? error : JSON.stringify(error))

      return false
    }
  }

  private async _verifyEmail(): Promise<void> {
    try {
      const { isEmailVerified } = await this.user$.pipe(take(1)).toPromise()

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
        ? this.errorHandler.openDialog(error.code)
        : this.errorHandler.openDialog(typeof error === 'string' ? error : JSON.stringify(error))
    }
  }

  private async _verifyExtraDataCompleted(uid: User['uid']): Promise<boolean> {
    try {
      const response = await this.http
        .get<GetUserResponse>(`${environment.apiUrl}/users/${uid}`)
        .toPromise()

      if (!response.email) {
        await this.logout()
        return false
      }

      const { province, locality, phoneNumber, birthday } = response

      return !!(province && locality && phoneNumber && birthday !== '1900-01-01')
    } catch (error: any) {
      error.code
        ? this.errorHandler.openDialog(error.code)
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

        void getIdTokenResult(currentUser).then(({ claims }) => {
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
        ? this.errorHandler.openDialog(error.code)
        : this.errorHandler.openDialog(typeof error === 'string' ? error : JSON.stringify(error))
    }
  }

  private async _createUser(uid: User['uid']): Promise<boolean> {
    try {
      const body: CreateUserRequest = {
        displayName: this._displayName,
        birthday: '1900-01-01',
        province: null,
        locality: null,
        phoneNumber: null,
      }

      const response = await this.http
        .post<CreateUserResponse>(`${environment.apiUrl}/users/?uid=${uid}`, body)
        .toPromise()

      return !!response?.id
    } catch (error: any) {
      error.code
        ? this.errorHandler.openDialog(error.code)
        : this.errorHandler.openDialog(typeof error === 'string' ? error : JSON.stringify(error))

      return false
    }
  }

  private async _sendUserData(uid: User['uid'], body: CreateUserRequest): Promise<boolean> {
    const response = await this.http
      .put(`${environment.apiUrl}/users/?uid=${uid}`, body, {
        responseType: 'text',
      })
      .toPromise()

    return response === 'Usuario actualizado'
  }

  async sendExtraData(extraData: ExtraDataSent): Promise<void> {
    try {
      const { birthday, phoneNumber, province, locality } = extraData

      const { uid, displayName } = await this.user$.pipe(take(1)).toPromise()

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
        ? this.errorHandler.openDialog(error.code)
        : error.error
        ? this.errorHandler.openDialog(error.error)
        : this.errorHandler.openDialog(typeof error === 'string' ? error : JSON.stringify(error))
    }
  }

  // Permissions and Claims

  async setPermissions(type: 'donor' | 'admin', uid: User['uid']): Promise<void> {
    try {
      const body = type === 'admin' ? { admin: true, donor: false } : { admin: false, donor: true }

      await this.http
        .put<User['claims']>(`${environment.apiUrl}/users/claims/${uid}`, body)
        .toPromise()

      void this._updateUser()
    } catch (error: any) {
      error.code
        ? this.errorHandler.openDialog(error.code)
        : this.errorHandler.openDialog(typeof error === 'string' ? error : JSON.stringify(error))
    }
  }

  // Others operations

  async logout(): Promise<void> {
    try {
      await this.auth.signOut()
      this._displayName = null
      this.snackBar.open('Se ha cerrado tu sesión correctamente', 'Cerrar', { duration: 5000 })
      return void this.router.navigate(['/'])
    } catch (error: any) {
      error.code
        ? this.errorHandler.openDialog(error.code)
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
        ? this.errorHandler.openDialog(error.code)
        : this.errorHandler.openDialog(typeof error === 'string' ? error : JSON.stringify(error))
    }
  }

  // TODO: Refactorizar la siguiente función para que reciba el UID desde los argumentos
  async deleteUser(): Promise<void> {
    try {
      const { uid } = await this.user$.pipe(take(1)).toPromise()

      await this.http
        .delete(`${environment.apiUrl}/users/${uid}`, { responseType: 'text' })
        .toPromise()
      await this.logout()
      this.snackBar.open('Tu cuenta ha sido eliminada correctamente', 'Cerrar', { duration: 5000 })
      return void this.router.navigate(['/'])
    } catch (error) {
      void this.snackBar.open('Hubo un error al eliminar tu cuenta', 'Cerrar', { duration: 5000 })
      return void this.router.navigate(['/'])
    }
  }

  async _updateUser(): Promise<void> {
    this._user && (await getIdToken(this._user, true))
  }
}

/*

{
  "headers":{"normalizedNames":{},
"lazyUpdate":null},
"status":500,
"statusText":"OK",
"url":"https://proyecto-scholas.herokuapp.com/users/?uid=1kGp1Kc8eHedsZnHHSrz0pKNN0K3",
"ok":false,
"name":"HttpErrorResponse",
"message":"Http failure response for https://proyecto-scholas.herokuapp.com/users/?uid=1kGp1Kc8eHedsZnHHSrz0pKNN0K3: 500 OK",
"error":"The user with the provided phone number already exists (PHONE_NUMBER_EXISTS)."}
*/
