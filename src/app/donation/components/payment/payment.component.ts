import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnChanges {
  @Input() label = ''
  @Input() isRecurring = false
  @Output() stepCompleted = new EventEmitter<boolean>()

  sendData(): void {
    this.stepCompleted.emit(true)
  }

  ngOnChanges(): void {
    setTimeout(() => {
      if (this.isRecurring) this.stepCompleted.emit(true)
    }, 2000)
  }
}
