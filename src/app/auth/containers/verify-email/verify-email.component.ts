import { Component } from '@angular/core'
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  email = ''
  constructor(public auth: AuthService) {
    this.auth.user$.subscribe((user) => (this.email = user.email ? ` a ${user.email}` : ''))
  }
}
