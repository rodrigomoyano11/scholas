import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-amount-selection-step',
  templateUrl: './amount-selection-step.component.html',
  styleUrls: ['./amount-selection-step.component.css'],
})
export class AmountSelectionStepComponent {
  @Output() stepCompleted = new EventEmitter<boolean>()

  sendData(): void {
    this.stepCompleted.emit(true)
  }
}
