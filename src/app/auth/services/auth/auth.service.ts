import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import firebase from 'firebase/app'
import { Router } from '@angular/router'
import { Observable, of, zip } from 'rxjs'
import { take } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar'
import { User } from 'src/app/shared/models/user'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

export type Provider = 'google' | 'facebook' | 'email'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Observables

  private _userData: User = {
    uid: '',
    displayName: null,
    photoURL: null,
    email: null,
    token: null,
    isLogged: false,
    claims: null,
    extraData: null
  }

  user$!: Observable<User>

  // Subscriptions
  user!: firebase.User | null
  userCredential!: firebase.auth.UserCredential | null

  idToken!: string | null

  // Flags
  isEmailVerified!: boolean | undefined

  // Others
  claims!: firebase.auth.IdTokenResult['claims'] | undefined
  uid!: firebase.User['uid'] | undefined

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    auth.credential.subscribe((userCredential) => {
      this.userCredential = userCredential
    })
    auth.idToken.subscribe((idToken) => {
      this.idToken = idToken
    })

    void this.getUserData()
  }

  // Login/Register Methods

  register(provider: Provider, email = '', password = ''): Promise<firebase.auth.UserCredential> {
    const methods = {
      google: () => this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()),
      facebook: () => this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()),
      email: () => this.auth.createUserWithEmailAndPassword(email, password)
    }

    return methods[provider]()
  }

  login(provider: Provider, email = '', password = ''): Promise<firebase.auth.UserCredential> {
    const methods = {
      google: () => this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()),
      facebook: () => this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()),
      email: () => this.auth.signInWithEmailAndPassword(email, password)
    }

    return methods[provider]()
  }

  // User data operations

  getUserData(): void {
    const idTokenResult$ = this.auth.idTokenResult
    const fireUser$ = this.auth.user

    zip(idTokenResult$, fireUser$).subscribe(([idTokenResult, fireUser]) => {
      if (!idTokenResult || !fireUser) {
        this.user$ = of({ ...this._userData })
        return
      }

      const { token, claims } = idTokenResult
      const { uid, displayName, photoURL, email, phoneNumber } = fireUser

      this.user$ = of({
        ...this._userData,
        uid,
        displayName,
        photoURL,
        email,
        token,
        claims,
        isLogged: !!token,
        extraData: {
          birthday: null,
          phoneNumber,
          location: null
        }
      })
    })
  }

  // Extra data operations

  getExtraData(): Promise<boolean> {
    return this.isExtraDataComplete().then((isCompleted) =>
      isCompleted ? this.router.navigate(['/']) : this.router.navigate(['/auth/extra-data'])
    )
  }

  sendExtraData(extraData: { [key: string]: string }): Promise<boolean> {
    console.log(extraData)
    // TODO: Enviar datos a backend y verificar datos
    this.snackBar.open('Tu cuenta ha sido creada correctamente', 'Cerrar')
    return this.router.navigate(['/'])
  }

  isExtraDataComplete(): Promise<boolean> {
    return new Promise((resolve) => resolve(true))
  }

  // Permissions and Claims

  setPermissions(type: 'donor' | 'admin', uid: User['uid']): Observable<unknown> {
    const body = type === 'admin' ? { admin: true, donor: false } : { admin: false, donor: true }
    return this.http.put<unknown>(`${environment.apiUrl}/users/claims/${uid}`, body)
  }

  // Others operations

  async logout(): Promise<void> {
    await this.auth.signOut()
    this.snackBar.open('Se ha cerrado tu sesión correctamente', 'Cerrar')
    return void this.router.navigate(['/'])
  }

  async resetPassword(email: string): Promise<void> {
    await this.auth.sendPasswordResetEmail(email)
    this.snackBar.open(
      `En ${email} recibirás un correo electrónico con un enlace para restablecer tu contraseña`,
      'Cerrar'
    )

    return void this.router.navigate(['/'])
  }

  verifyEmail(): void {
    this.user$.subscribe(() => {
      if (this.isEmailVerified !== undefined && !this.isEmailVerified)
        this.snackBar
          .open('Acordate de verificar tu correo electrónico', 'Hacerlo ahora')
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
