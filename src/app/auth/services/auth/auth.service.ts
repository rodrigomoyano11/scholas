import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import firebase from 'firebase/app'
import { UserCredential, User, IdTokenResult } from '@firebase/auth-types'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { take } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar'

export type Provider = 'google' | 'facebook' | 'email'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Observables
  authState$!: Observable<User | null>

  // Subscriptions
  user!: User | null
  userCredential!: UserCredential | null
  idTokenResult!: IdTokenResult | null
  idToken!: string | null

  // Flags
  isLogged = false
  isEmailVerified!: boolean | undefined

  // Others
  claims!: IdTokenResult['claims'] | undefined

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    auth.user.subscribe((user) => {
      this.user = user
      this.isEmailVerified = this.user?.emailVerified
    })
    auth.idTokenResult.subscribe((idTokenResult) => {
      this.idTokenResult = idTokenResult
      this.claims = idTokenResult?.claims
    })
    auth.credential.subscribe((userCredential) => {
      this.userCredential = userCredential
    })
    auth.idToken.subscribe((idToken) => {
      this.idToken = idToken
      this.isLogged = !!this.idToken || false
    })

    this.authState$ = auth.authState
  }

  // Login/Register Methods

  register(provider: Provider, email = '', password = ''): Promise<UserCredential> {
    const methods = {
      google: () => this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()),
      facebook: () => this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()),
      email: () => this.auth.createUserWithEmailAndPassword(email, password)
    }

    return methods[provider]()
  }

  login(provider: Provider, email = '', password = ''): Promise<UserCredential> {
    const methods = {
      google: () => this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()),
      facebook: () => this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()),
      email: () => this.auth.signInWithEmailAndPassword(email, password)
    }

    return methods[provider]()
  }

  getExtraData(): Promise<boolean> {
    // TODO: Verificar si es necesario registrar más datos
    return this.router.navigate(['/auth/extra-data'])
  }

  sendExtraData(extraData: { [key: string]: string }): Promise<boolean> {
    console.log(extraData)
    // TODO: Enviar datos a backend y verificar datos
    this.snackBar.open('Tu cuenta ha sido creada correctamente', 'Cerrar')
    return this.router.navigate(['/'])
  }

  // Permissions and Claims

  // setPermissions(type: 'donor' | 'admin', uid = ''): Observable<unknown> {
  //   const body = type === 'admin' ? { admin: true, donor: false } : { admin: false, donor: true }
  //   return this.http.post(`${environment.apiUrl}/users/claims/:${uid}`, body)
  // }

  // Others operations

  async logout(): Promise<void> {
    await this.auth.signOut()
    this.snackBar.open('Se ha cerrado tu sesión correctamente', 'Cerrar')
    return void this.router.navigate(['/'])
  }

  async resetPassword(email: string): Promise<void> {
    await this.auth.sendPasswordResetEmail(email)
    this.snackBar.open(
      `Se ha enviado un correo a ${email} para restablecer tu contraseña`,
      'Cerrar'
    )

    return void this.router.navigate(['/'])
  }

  verifyEmail(): void {
    this.authState$.subscribe(() => {
      if (this.isEmailVerified !== undefined && !this.isEmailVerified)
        this.snackBar
          .open('Necesitamos verificar tu correo electrónico', 'Verificar')
          .onAction()
          .pipe(take(1))
          .subscribe(
            () =>
              void this.user
                ?.sendEmailVerification()
                .then(() => void this.router.navigate(['/auth/verify-email']))
          )
    })
  }

  async deleteAccount(): Promise<void> {
    const user = await this.auth.currentUser
    // TODO: Conectarse con Backend para eliminar al usuario
    await user?.delete()
    this.snackBar.open('Tu cuenta ha sido eliminada correctamente', 'Cerrar')
    return void this.router.navigate(['/'])
  }
}
