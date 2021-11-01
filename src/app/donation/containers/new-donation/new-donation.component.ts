import { Component } from '@angular/core'
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper'
import { LayoutService } from 'src/app/shared/services/layout/layout.service'
import { Donation } from 'src/app/shared/models/donation.interface'

@Component({
  selector: 'app-new-donation',
  templateUrl: './new-donation.component.html',
  styleUrls: ['./new-donation.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class NewDonationComponent {
  // Stepper Data
  selectedIndex = 0
  stepperStatus = [false, false, false]
  state!: 'failure' | 'pending' | 'success' | 'recurring'

  // Donation Data
  amount!: Donation['amount']
  type!: Donation['type']

  constructor(public layout: LayoutService) {}

  setStepperStatus(stepIndex: number, value: boolean): void {
    this.stepperStatus[stepIndex] = value
  }

  handleAmountSelectionComplete(): void {
    if (this.type === 'recurring') {
      this.state = 'recurring'
      this.selectedIndex = 2
      this.setStepperStatus(0, true)
      this.setStepperStatus(1, true)
    }
  }
}
