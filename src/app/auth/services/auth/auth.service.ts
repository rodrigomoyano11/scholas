import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, zip } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar'
import { User } from 'src/app/shared/models/user'
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
  updateCurrentUser,
  user
} from '@angular/fire/auth'

export type Provider = 'google' | 'facebook' | 'email'

@Injectable({
  providedIn: 'root'
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
    extraData: null
  }
  private _userData: User = this._defaultData
  private _user = this.auth.currentUser

  user$: BehaviorSubject<User> = new BehaviorSubject(this._defaultData)

  constructor(
    private auth: Auth,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.user$.next(this._defaultData)

    this._getUserData()
  }

  // Login/Register Methods

  async register(provider: Provider, email = '', password = ''): Promise<void> {
    await this.login(provider, email, password, true)
  }

  async login(provider: Provider, email = '', password = '', isNewUser = false): Promise<void> {
    const methods = {
      google: () => signInWithPopup(this.auth, new GoogleAuthProvider()),
      facebook: () => signInWithPopup(this.auth, new FacebookAuthProvider()),
      email: () =>
        isNewUser
          ? createUserWithEmailAndPassword(this.auth, email, password)
          : signInWithEmailAndPassword(this.auth, email, password)
    }

    const credential = await methods[provider]()
    isNewUser = getAdditionalUserInfo(credential)?.isNewUser ?? false

    const token = await getIdToken(credential.user)
    const isVerifiedToken = await this._verifyToken(token)

    if (!isVerifiedToken) return this.logout()

    if (isNewUser) {
      const { claims, uid } = await this.user$.pipe(take(1)).toPromise()
      if (claims && !claims.admin) await this.setPermissions('donor', uid)
      // TODO: Crear usuario en el backend
    }

    // TODO: Verificar si faltan datos extra. Si es así, se redirige a ExtraData
    // TODO: Se envían los datos de ExtraData
    // TODO: Se muestra mensaje de cuenta creada correctamente
    await this._verifyEmail()
  }

  // Verifications

  private async _verifyToken(token: User['token']): Promise<boolean> {
    if (!token) return false

    return this.http
      .get<never>(`${environment.apiUrl}/auth/${token}`)
      .pipe(map(({ body }) => !!body && body !== 'Token is invalid'))
      .toPromise()
  }

  private async _verifyEmail(): Promise<void> {
    const { isEmailVerified } = await this.user$.pipe(take(1)).toPromise()

    if (isEmailVerified || !this._user) return

    this.snackBar
      .open('Acordate de verificar tu correo electrónico', 'Hacerlo ahora')
      .onAction()
      .pipe(take(1))
      .subscribe(
        () =>
          this._user &&
          void sendEmailVerification(this._user).then(() =>
            this.router.navigate(['/auth/verify-email'])
          )
      )
  }

  // User data operations

  private _getUserData(): void {
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
            birthday: null,
            phoneNumber,
            location: null
          }
        }

        this._user = currentUser

        this.user$.next(this._userData)
      })
    })
  }

  async getExtraData(): Promise<boolean> {
    return (await this.isExtraDataComplete())
      ? this.router.navigate(['/'])
      : this.router.navigate(['/auth/extra-data'])
  }

  sendExtraData(extraData: { [key: string]: string }): Promise<boolean> {
    console.log(extraData)
    // TODO: Enviar datos a backend y verificar datos
    this.snackBar.open('Tu cuenta ha sido creada correctamente', 'Cerrar', { duration: 5000 })
    return this.router.navigate(['/'])
  }

  isExtraDataComplete(): Promise<boolean> {
    // TODO: Verificar si los datos estan completos
    return new Promise((resolve) => resolve(true))
  }

  // Permissions and Claims

  async setPermissions(type: 'donor' | 'admin', uid: User['uid']): Promise<void> {
    const body = type === 'admin' ? { admin: true, donor: false } : { admin: false, donor: true }

    await this.http
      .put<User['claims']>(`${environment.apiUrl}/users/claims/${uid}`, body)
      .toPromise()

    await this._user?.getIdToken(true)
  }

  // Others operations

  async logout(): Promise<void> {
    await this.auth.signOut()
    this.snackBar.open('Se ha cerrado tu sesión correctamente', 'Cerrar', { duration: 5000 })
    return void this.router.navigate(['/'])
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email)

    this.snackBar.open(
      `En ${email} recibirás un correo electrónico con un enlace para restablecer tu contraseña`,
      'Cerrar',
      { duration: 5000 }
    )

    return void this.router.navigate(['/'])
  }

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
      console.error(error)
      void this.snackBar.open('Hubo un error al eliminar tu cuenta', 'Cerrar', { duration: 5000 })
      return void this.router.navigate(['/'])
    }
  }

  async updateUser(): Promise<void> {
    await updateCurrentUser(this.auth, this._user)
  }
}
