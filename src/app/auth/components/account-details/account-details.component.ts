import { Component } from '@angular/core'
import { AuthService } from 'src/app/auth/services/auth/auth.service'

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent {
  constructor(public auth: AuthService) {}
  action(): void {
    //
  }
}
