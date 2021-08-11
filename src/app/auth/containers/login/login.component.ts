import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { AuthService, Provider } from '../../services/auth/auth.service'
import { ValidationService } from '../../services/validation/validation.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private validation: ValidationService,
    private auth: AuthService,
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

    this.iconRegistry.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg')
    )
    this.iconRegistry.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/google.svg')
    )
  }

  getErrors(controlName: string): string {
    return this.validation.getErrors(this.loginForm.controls[controlName])
  }

  login(provider: Provider): void {
    const password = <string>this.loginForm.controls['password'].value
    const email = <string>this.loginForm.controls['email'].value

    this.auth
      .login(provider, email, password)
      .then((userCredential) => userCredential.user)
      .then(() => this.auth.verifyEmail())
      .catch((error) => console.log(error))
  }
}
