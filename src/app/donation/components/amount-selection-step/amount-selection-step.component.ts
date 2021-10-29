import { Component, EventEmitter, Output } from '@angular/core'
import { DonationsService } from '../../services/donations/donations.service'

@Component({
  selector: 'app-amount-selection-step',
  templateUrl: './amount-selection-step.component.html',
  styleUrls: ['./amount-selection-step.component.css'],
})
export class AmountSelectionStepComponent {
  @Output() stepCompleted = new EventEmitter<boolean>()

  constructor(public donations: DonationsService) {}

  sendData(): void {
    this.stepCompleted.emit(true)
  }
}
