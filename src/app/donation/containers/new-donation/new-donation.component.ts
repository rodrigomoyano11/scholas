import { Component } from '@angular/core'
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper'

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
  stepperStatus = [false, false, false]

  setStepperStatus(stepIndex: number, value: boolean): void {
    this.stepperStatus[stepIndex] = value
  }
}
