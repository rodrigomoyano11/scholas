import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-pending-payment',
  templateUrl: './pending-payment.component.html',
  styleUrls: ['./pending-payment.component.css'],
})
export class PendingPaymentComponent {
  @Output() stepCompleted = new EventEmitter<boolean>()

  sendData(): void {
    this.stepCompleted.emit(true)
  }
}
