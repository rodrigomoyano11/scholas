import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import firebase from 'firebase/app'
import { UserCredential, User } from '@firebase/auth-types'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { take } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar'

export type Provider = 'google' | 'facebook' | 'email'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$!: Observable<User | null>
  user: User | null = null

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.user$ = this.auth.user
    this.user$.subscribe((user) => {
      this.user = user
    })
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

  // Others operations

  async logout(): Promise<void> {
    await this.auth.signOut()
    return void this.router.navigate(['/'])
  }

  async resetPassword(email: string): Promise<void> {
    await this.auth.sendPasswordResetEmail(email)
    return void this.router.navigate(['/'])
  }

  verifyEmail(): void {
    void this.auth.currentUser.then((currentUser) => {
      if (!currentUser?.emailVerified) {
        this.snackBar
          .open('Necesitamos verificar tu correo electrónico', 'Verificar', {
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
          .onAction()
          .pipe(take(1))
          .subscribe(() => {
            void this.user
              ?.sendEmailVerification()
              .then(() => this.router.navigate(['/auth/verify-email']))
          })
      }
    })
  }

  async deleteAccount(): Promise<void> {
    const user = await this.auth.currentUser
    await user?.delete()
    return void this.router.navigate(['/'])
  }
}
