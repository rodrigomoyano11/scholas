import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-donation-completion-step',
  templateUrl: './donation-completion-step.component.html',
  styleUrls: ['./donation-completion-step.component.css'],
})
export class DonationCompletionStepComponent {
  @Output() stepCompleted = new EventEmitter<boolean>()

  sendData(): void {
    this.stepCompleted.emit(true)
  }
}
