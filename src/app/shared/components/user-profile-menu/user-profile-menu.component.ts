import { Component } from '@angular/core'
import { AuthService } from 'src/app/auth/services/auth/auth.service'

@Component({
  selector: 'app-user-profile-menu',
  templateUrl: './user-profile-menu.component.html',
  styleUrls: ['./user-profile-menu.component.css']
})
export class UserProfileMenuComponent {
  userType!: 'Donante' | 'Administrador' | string
  userName!: string | undefined

  constructor(public auth: AuthService) {
    this.auth.user$.subscribe((user) => {
      this.userName = user.displayName?.split(' ')[0]

      this.selectTitle()
    })
  }

  selectTitle(): void {
    this.auth.user$.subscribe((user) =>
      user.claims?.admin
        ? (this.userType = 'Administrador')
        : (this.userType = this.userName || 'Donante')
    )
  }
}
