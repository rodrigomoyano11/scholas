import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import firebase from 'firebase/app'
import { UserCredential, User } from '@firebase/auth-types'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'

export type Provider = 'google' | 'facebook' | 'email'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private router: Router) {}

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

  // Getters

  getUser(): Observable<User | null> {
    return this.auth.user
  }

  // Others operations

  async logout(): Promise<void> {
    await this.auth.signOut()
    return void this.router.navigate(['/'])
  }
}
