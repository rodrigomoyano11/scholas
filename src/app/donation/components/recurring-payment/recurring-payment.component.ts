import { Component, Output, EventEmitter, OnInit } from '@angular/core'

@Component({
  selector: 'app-recurring-payment',
  templateUrl: './recurring-payment.component.html',
  styleUrls: ['./recurring-payment.component.css'],
})
export class RecurringPaymentComponent implements OnInit {
  @Output() stepCompleted = new EventEmitter<boolean>()

  ngOnInit(): void {
    this.stepCompleted.emit(true)
  }
}
