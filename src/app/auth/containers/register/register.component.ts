import { Component } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', []],
      email: ['', []],
      password: ['', []],
      passwordConfirm: ['', []]
    })
  }

  register(): void {
    console.log(this.registerForm.value)
  }
}
