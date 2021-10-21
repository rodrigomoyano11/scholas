import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ValidationService } from 'src/app/admin/services/validation/validation.service'

@Component({
  selector: 'app-donation-amounts-settings',
  templateUrl: './donation-amounts-settings.component.html',
  styleUrls: ['./donation-amounts-settings.component.css'],
})
export class DonationAmountsSettingsComponent {
  form: FormGroup
  hidePassword = true

  constructor(private fb: FormBuilder, private validation: ValidationService) {
    this.form = this.fb.group({
      donationAmount1: [
        '',
        [Validators.required, validation.isNumber(), validation.isValidTargetAmount()],
      ],
      donationAmount2: [
        '',
        [Validators.required, validation.isNumber(), validation.isValidTargetAmount()],
      ],
      donationAmount3: [
        '',
        [Validators.required, validation.isNumber(), validation.isValidTargetAmount()],
      ],
      donationAmount4: [
        '',
        [Validators.required, validation.isNumber(), validation.isValidTargetAmount()],
      ],
    })
  }

  getErrors(controlName: string): string {
    return this.validation.getErrors(this.form.controls[controlName])
  }

  handleSubmit(): void {
    //
  }
}
