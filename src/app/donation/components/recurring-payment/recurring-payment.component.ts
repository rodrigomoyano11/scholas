import { Component } from '@angular/core'
import { AuthService } from 'src/app/auth/services/auth/auth.service'

@Component({
  selector: 'app-recurring-payment',
  templateUrl: './recurring-payment.component.html',
  styleUrls: ['./recurring-payment.component.css'],
})
export class RecurringPaymentComponent {
  constructor(public auth: AuthService) {}
}
