import { Component } from '@angular/core'
import { AuthService } from 'src/app/auth/services/auth/auth.service'

@Component({
  selector: 'app-user-profile-menu',
  templateUrl: './user-profile-menu.component.html',
  styleUrls: ['./user-profile-menu.component.css'],
})
export class UserProfileMenuComponent {
  userType!: 'Donante' | 'Administrador' | string

  constructor(public auth: AuthService) {
    this.auth.user$.subscribe((user) => {
      const userName = user.displayName?.split(' ')[0]

      this.userType = user.claims?.admin ? 'Administrador' : userName || 'Donante'
    })
  }
}
