import { Injectable } from '@angular/core'

export type Provider = 'google' | 'facebook' | 'email'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  register(provider: Provider, email = '', password = ''): void {
    console.log(provider, email, password)
  }

  login(provider: Provider, email = '', password = ''): void {
    console.log(provider, email, password)
  }
}
