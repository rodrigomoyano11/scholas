import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.css'],
})
export class SuccessPaymentComponent {
  @Output() stepCompleted = new EventEmitter<boolean>()

  sendData(): void {
    this.stepCompleted.emit(true)
  }
}
