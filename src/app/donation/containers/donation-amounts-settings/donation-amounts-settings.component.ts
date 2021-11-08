import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { ErrorService } from 'src/app/auth/services/error/error.service'
import { ValidationService } from 'src/app/shared/services/validation/validation.service'
import { DonationsService } from '../../services/donations/donations.service'

export interface DonationAmountSettingsForm {
  amount1: number
  amount2: number
  amount3: number
  amount4: number
}

@Component({
  selector: 'app-donation-amounts-settings',
  templateUrl: './donation-amounts-settings.component.html',
  styleUrls: ['./donation-amounts-settings.component.css'],
})
export class DonationAmountsSettingsComponent {
  form: FormGroup
  hidePassword = true

  isLoading = true
  submitIsLoading = false

  constructor(
    private fb: FormBuilder,
    private validation: ValidationService,
    private donations: DonationsService,
    private router: Router,
    private errorHandler: ErrorService,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group({
      amount1: ['', [Validators.required, validation.isNumber(), validation.isValidTargetAmount()]],
      amount2: ['', [Validators.required, validation.isNumber(), validation.isValidTargetAmount()]],
      amount3: ['', [Validators.required, validation.isNumber(), validation.isValidTargetAmount()]],
      amount4: ['', [Validators.required, validation.isNumber(), validation.isValidTargetAmount()]],
    })
    this.setInitialValues()
  }

  setInitialValues(): void {
    void this.donations.getDonationAmounts().then(() => {
      const amountsConfig = this.donations.donationAmountsConfig
      this.form.patchValue({
        amount1: amountsConfig[0].toString(),
        amount2: amountsConfig[1].toString(),
        amount3: amountsConfig[2].toString(),
        amount4: amountsConfig[3].toString(),
      })
      this.isLoading = false
    })
  }

  getErrors(controlName: string): string {
    return this.validation.getErrors(this.form.controls[controlName])
  }

  hasAmountError(values: DonationAmountSettingsForm): boolean {
    const amounts = [values.amount1, values.amount2, values.amount3, values.amount4].map((amount) =>
      Number(amount),
    )

    if (amounts[0] > amounts[1]) return true
    if (amounts[0] > amounts[2]) return true
    if (amounts[0] > amounts[3]) return true

    if (amounts[1] > amounts[2]) return true
    if (amounts[1] > amounts[3]) return true

    if (amounts[2] > amounts[3]) return true

    return false
  }

  async handleSubmit(): Promise<void> {
    this.submitIsLoading = true
    const formValues = this.form.value as DonationAmountSettingsForm
    if (this.hasAmountError(formValues))
      return this.errorHandler.openDialog(
        'Los valores deben tener un orden ascendente. Ej: 100, 200, 300, 400',
      )

    await this.donations.editDonationAmounts(formValues)

    this.snackBar.open('Los cambios han sido guardados correctamente', 'Cerrar', { duration: 5000 })

    await this.router.navigate(['/']).then(() => (this.submitIsLoading = false))
  }
}
