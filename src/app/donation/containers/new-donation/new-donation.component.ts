import { Component } from '@angular/core'
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper'
import { LayoutService } from 'src/app/shared/services/layout/layout.service'

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

  constructor(public layout: LayoutService) {}

  setStepperStatus(stepIndex: number, value: boolean): void {
    this.stepperStatus[stepIndex] = value
  }
  onEvent(value: string): void {
    console.log(value)
  }
}
