import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import firebase from 'firebase/app'
import { Router } from '@angular/router'
import { BehaviorSubject, zip } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar'
import { User } from 'src/app/shared/models/user'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

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
  private _user: firebase.User | null = null

  user$: BehaviorSubject<User> = new BehaviorSubject(this._defaultData)

  constructor(
    private auth: AngularFireAuth,
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

    const { claims, uid } = await this.user$.pipe(take(1)).toPromise()
    if (claims && !claims.admin) await this.setPermissions('donor', uid)
  }

  async login(provider: Provider, email = '', password = '', isNewUser = false): Promise<void> {
    const methods = {
      google: () => this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()),
      facebook: () => this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()),
      email: () =>
        isNewUser
          ? this.auth.createUserWithEmailAndPassword(email, password)
          : this.auth.signInWithEmailAndPassword(email, password)
    }

    const { user } = await methods[provider]()
    const token = (await user?.getIdToken()) ?? null
    const isVerifiedToken = await this.verifyToken(token)

    if (!isVerifiedToken) return this.logout()

    if (isNewUser) return

    await this.verifyEmail()
  }

  // Verifications

  async verifyToken(token: User['token']): Promise<boolean> {
    if (!token) return false

    return this.http
      .get<never>(`${environment.apiUrl}/auth/${token}`)
      .pipe(map(({ body }) => !!body && body !== 'Token is invalid'))
      .toPromise()
  }

  async verifyEmail(): Promise<void> {
    const { isEmailVerified } = await this.user$.pipe(take(1)).toPromise()

    if (isEmailVerified || !this._user) return

    this.snackBar
      .open('Acordate de verificar tu correo electrónico', 'Hacerlo ahora')
      .onAction()
      .pipe(take(1))
      .subscribe(
        () =>
          void this._user
            ?.sendEmailVerification()
            .then(() => this.router.navigate(['/auth/verify-email']))
      )
  }

  // User data operations

  private _getUserData(): void {
    const idTokenResult$ = this.auth.idTokenResult
    const currentUser$ = this.auth.user

    zip(idTokenResult$, currentUser$).subscribe(([idTokenResult, currentUser]) => {
      if (!idTokenResult || !currentUser) {
        this.user$.next(this._defaultData)
        return
      }

      this._user = currentUser

      const { token, claims } = idTokenResult
      const { uid, displayName, photoURL, email, phoneNumber, emailVerified } = this._user

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

      this.user$.next(this._userData)
    })
  }

  // Extra data operations

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
    await this.auth.sendPasswordResetEmail(email)

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

  async updateCurrentUser(): Promise<void> {
    await this.auth.updateCurrentUser(this._user)
  }
}
