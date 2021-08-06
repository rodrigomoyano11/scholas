import { Component } from '@angular/core'
import { AuthService } from 'src/app/auth/services/auth/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLogged = false

  constructor(private auth: AuthService) {
    this.auth.user$.subscribe((user) => (this.isLogged = !!user?.getIdToken(true)))
  }

  logout(): void {
    void this.auth.logout()
  }

  deleteAccount(): void {
    void this.auth.deleteAccount()
  }
}
