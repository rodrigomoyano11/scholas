import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth/auth.service'
import { LocationService } from '../../services/location.service'
import { ValidationService } from '../../services/validation/validation.service'

@Component({
  selector: 'app-update-account-details',
  templateUrl: './update-account-details.component.html',
  styleUrls: ['./update-account-details.component.css'],
})
export class UpdateAccountDetailsComponent implements OnInit {
  backButtonAction = (): void => void this.router.navigate(['/auth/account'])

  form: FormGroup

  minDate: Date
  maxDate: Date

  provinces: string[] = []
  localities: string[] = []
  provinceControl: AbstractControl
  localityControl: AbstractControl

  constructor(
    private validation: ValidationService,
    private fb: FormBuilder,
    private auth: AuthService,
    public location: LocationService,
    private router: Router,
  ) {
    const currentYear = new Date().getFullYear()
    this.minDate = new Date(currentYear - 100, 0, 1)
    this.maxDate = new Date(currentYear - 13, 11, 31)

    this.form = this.fb.group({
      firstName: ['', [Validators.required, validation.isValidFirstName()]],
      lastName: ['', [Validators.required, validation.isValidLastName()]],
      email: ['', [Validators.required, validation.isValidEmail()]],
      birthday: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, validation.isValidPhoneNumber()]],
      province: ['', [Validators.required]],
      locality: ['', [Validators.required]],
    })

    this.provinceControl = this.form.controls['province']
    this.localityControl = this.form.controls['locality']
  }

  async ngOnInit(): Promise<void> {
    this.provinceControl.disable()
    this.localityControl.disable()
    await this.getProvinces()
  }

  async getProvinces(): Promise<void> {
    this.provinces = await this.location.getProvinces()
    const provinceHasData = !!this.provinces.length
    provinceHasData && this.provinceControl.enable()
  }

  async getLocalitiesByProvince(province: string): Promise<void> {
    this.localityControl.disable()

    this.localities = []
    this.localities = await this.location.getLocalitiesByProvince(province)
    const localityHasData = province !== '' && !!this.localities.length
    localityHasData && this.localityControl.enable()
  }

  getErrors(controlName: string): string {
    return this.validation.getErrors(this.form.controls[controlName])
  }

  submitExtraData(): void {
    // void this.auth.sendExtraData(this.form.value)
  }
}
