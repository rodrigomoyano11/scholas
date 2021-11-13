import { Component, EventEmitter, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Donation } from 'src/app/core/models/donation.interface'
import { DonationsService } from '../../services/donations/donations.service'

@Component({
  selector: 'app-amount-selection-step',
  templateUrl: './amount-selection-step.component.html',
  styleUrls: ['./amount-selection-step.component.css'],
})
export class AmountSelectionStepComponent {
  @Output() stepCompleted = new EventEmitter<boolean>()
  @Output() donationAmount = new EventEmitter<Donation['amount']>()
  @Output() donationType = new EventEmitter<Donation['type']>()

  toggleGroupControl = new FormControl()
  textInputControl = new FormControl()
  checkboxControl = new FormControl(false)

  constructor(public donations: DonationsService) {}

  onInputFocus(): void {
    this.toggleGroupControl.patchValue('')
    this.sendData()
  }
  onToggleGroupFocus(): void {
    this.textInputControl.patchValue('')
    this.sendData()
  }

  onCheckboxChange(): void {
    this.sendData()
  }

  sendData(): void {
    const toggleGroupValue = (this.toggleGroupControl.value as number)?.toString() ?? ''
    const textInputValue = (this.textInputControl.value ?? '') as string
    const checkboxValue = (this.checkboxControl.value ?? false) as boolean

    const formData = {
      amount: Number(textInputValue !== '' ? textInputValue : toggleGroupValue),
      recurring: checkboxValue,
    }

    if (formData.amount <= 0) {
      this.stepCompleted.emit(false)
      return
    }

    this.donationAmount.emit(formData.amount)
    this.donationType.emit(formData.recurring ? 'recurring' : 'regular')
    this.stepCompleted.emit(true)
  }
}
