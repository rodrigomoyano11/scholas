import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-failure-payment',
  templateUrl: './failure-payment.component.html',
  styleUrls: ['./failure-payment.component.css'],
})
export class FailurePaymentComponent {
  @Output() stepCompleted = new EventEmitter<boolean>()

  sendData(): void {
    this.stepCompleted.emit(true)
  }
}
