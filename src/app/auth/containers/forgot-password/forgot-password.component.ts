import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ValidationService } from '../../services/validation/validation.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup

  constructor(private fb: FormBuilder, private validation: ValidationService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  getErrors(controlName: string): string {
    return this.validation.getErrors(
      this.forgotPasswordForm.controls[controlName]
    )
  }

  resetPassword(): void {
    console.log(this.forgotPasswordForm.value)
  }
}
