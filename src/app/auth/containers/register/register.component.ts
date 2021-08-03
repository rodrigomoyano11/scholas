import { Component } from '@angular/core'
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms'
import { ValidationService } from '../../services/validation/validation.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup

  constructor(private fb: FormBuilder, private validation: ValidationService) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, validation.isValidName()]],
        email: ['', [Validators.required, Validators.email]],
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

  register(): void {
    console.log(this.registerForm.value)
  }
}
