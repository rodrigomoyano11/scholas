import { Component } from '@angular/core'
import { User } from '@firebase/auth-types'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user$: Observable<User | null>
  constructor(private auth: AuthService) {
    this.user$ = auth.getUser()
  }

  logout(): void {
    void this.auth.logout()
  }
}
