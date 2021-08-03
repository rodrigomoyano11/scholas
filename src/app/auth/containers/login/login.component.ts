import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ValidationService } from '../../services/validation/validation.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup

  constructor(private fb: FormBuilder, private validation: ValidationService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  getErrors(controlName: string): string {
    return this.validation.getErrors(this.loginForm.controls[controlName])
  }

  login(): void {
    console.log(this.loginForm.value)
  }
}
