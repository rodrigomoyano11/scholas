import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ValidationService } from 'src/app/shared/services/validation/validation.service'
import { AuthService, Provider } from '../../services/auth/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup
  hidePassword = true

  constructor(
    private fb: FormBuilder,
    private validation: ValidationService,
    private auth: AuthService,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, validation.isValidEmail()]],
      password: ['', [Validators.required]],
    })
  }

  getErrors(controlName: string): string {
    return this.validation.getErrors(this.form.controls[controlName])
  }

  login(provider: Provider): void {
    const password = <string>this.form.controls['password'].value
    const email = <string>this.form.controls['email'].value

    void this.auth.login(provider, email, password)
  }
}
