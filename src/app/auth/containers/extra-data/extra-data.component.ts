import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth/auth.service'
import { ValidationService } from '../../services/validation/validation.service'

@Component({
  selector: 'app-extra-data',
  templateUrl: './extra-data.component.html',
  styleUrls: ['./extra-data.component.css']
})
export class ExtraDataComponent {
  extraDataForm: FormGroup

  constructor(
    private validation: ValidationService,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.extraDataForm = this.fb.group({
      birthday: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      province: ['', [Validators.required]],
      department: ['', [Validators.required]]
    })
  }

  getErrors(controlName: string): string {
    return this.validation.getErrors(this.extraDataForm.controls[controlName])
  }

  submitExtraData(): void {
    void this.auth.sendExtraData(this.extraDataForm.value)
  }
}
