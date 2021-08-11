import { Component } from '@angular/core'
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService, Provider } from '../../services/auth/auth.service'
import { ValidationService } from '../../services/validation/validation.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private validation: ValidationService,
    private auth: AuthService
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, validation.isValidName()]],
        email: ['', [Validators.required, validation.isValidEmail()]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(24),
            validation.isStrongPassword()
          ]
        ],
        passwordConfirm: ['', [Validators.required]]
      },
      {
        validators: [validation.isControlsMatch('password', 'passwordConfirm')]
      } as AbstractControlOptions
    )
  }

  getErrors(controlName: string): string {
    return this.validation.getErrors(this.registerForm.controls[controlName])
  }

  register(provider: Provider): void {
    const password = <string>this.registerForm.controls['password'].value
    const email = <string>this.registerForm.controls['email'].value

    this.auth
      .register(provider, email, password)
      .then(() => this.auth.getExtraData())
      .then((resume) => !resume && this.auth.verifyEmail())
      .catch((error) => console.log(error))
  }
}
