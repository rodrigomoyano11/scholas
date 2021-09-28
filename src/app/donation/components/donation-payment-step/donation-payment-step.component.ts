import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-donation-payment-step',
  templateUrl: './donation-payment-step.component.html',
  styleUrls: ['./donation-payment-step.component.css'],
})
export class DonationPaymentStepComponent {
  @Output() stepCompleted = new EventEmitter<boolean>()

  sendData(): void {
    this.stepCompleted.emit(true)
  }
}
