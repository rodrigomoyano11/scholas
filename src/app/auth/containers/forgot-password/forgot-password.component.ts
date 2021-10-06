import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth/auth.service'
import { ValidationService } from '../../services/validation/validation.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private validation: ValidationService,
    private auth: AuthService,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, validation.isValidEmail()]],
    })
  }

  getErrors(controlName: string): string {
    return this.validation.getErrors(this.form.controls[controlName])
  }

  resetPassword(): void {
    const email = <string>this.form.controls['email'].value

    void this.auth.resetPassword(email)
  }
}
