import { Component } from '@angular/core'
import { AuthService } from 'src/app/auth/services/auth/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLogged = false
  claims!: { [key: string]: string }
  userType!: 'Donante' | 'Administrador'

  constructor(private auth: AuthService) {
    this.auth.user$.subscribe(
      (user) =>
        void user?.getIdTokenResult().then((idTokenResult) => {
          this.isLogged = !!idTokenResult.token
          this.claims = idTokenResult.claims
          this.selectTitle()
        })
    )
  }

  selectTitle(): void {
    if (this.claims.admin) this.userType = 'Administrador'
    this.userType = 'Donante'
  }

  logout(): void {
    void this.auth.logout()
  }

  deleteAccount(): void {
    void this.auth.deleteAccount()
  }
}
