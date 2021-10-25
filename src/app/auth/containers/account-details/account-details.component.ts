import { Component } from '@angular/core'
import { AuthService } from 'src/app/auth/services/auth/auth.service'

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent {
  photoURL!: string
  displayName!: string
  email!: string

  constructor(public auth: AuthService) {
    this.auth.user$.subscribe((user) => {
      this.photoURL = user.photoURL ?? 'assets/vectors/profile-picture-default.svg'
      this.displayName = user.displayName ?? 'Donante'
      this.email = user.email ?? ''
    })
  }
}
