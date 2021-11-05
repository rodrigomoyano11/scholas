import { Component } from '@angular/core'
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ValidationService } from 'src/app/shared/services/validation/validation.service'
import { AuthService, Provider } from '../../services/auth/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup
  hidePassword = true
  isLoading = false

  constructor(
    private fb: FormBuilder,
    private validation: ValidationService,
    private auth: AuthService,
  ) {
    this.form = this.fb.group(
      {
        firstName: ['', [Validators.required, validation.isValidFirstName()]],
        lastName: ['', [Validators.required, validation.isValidLastName()]],
        email: ['', [Validators.required, validation.isValidEmail()]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(24),
            validation.isStrongPassword(),
          ],
        ],
        passwordConfirm: ['', [Validators.required]],
      },
      {
        validators: [validation.isControlsMatch('password', 'passwordConfirm')],
      } as AbstractControlOptions,
    )
  }

  getErrors(controlName: string): string {
    return this.validation.getErrors(this.form.controls[controlName])
  }

  register(provider: Provider): void {
    const password = <string>this.form.controls['password'].value
    const email = <string>this.form.controls['email'].value

    const firstName = <string>this.form.controls['firstName'].value
    const lastName = <string>this.form.controls['lastName'].value

    this.isLoading = true
    void this.auth
      .register(provider, email, password, `${firstName} ${lastName}`)
      .then(() => (this.isLoading = false))
  }
}
