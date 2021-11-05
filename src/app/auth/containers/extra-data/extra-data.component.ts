import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LocationService } from 'src/app/shared/services/location/location.service'
import { ValidationService } from 'src/app/shared/services/validation/validation.service'
import { AuthService, ExtraDataSentForm } from '../../services/auth/auth.service'

@Component({
  selector: 'app-extra-data',
  templateUrl: './extra-data.component.html',
  styleUrls: ['./extra-data.component.css'],
})
export class ExtraDataComponent implements OnInit {
  form: FormGroup

  minDate: Date
  maxDate: Date

  provinces: string[] = []
  localities: string[] = []
  provinceControl: AbstractControl
  localityControl: AbstractControl

  isLoading = false

  constructor(
    private validation: ValidationService,
    private fb: FormBuilder,
    private auth: AuthService,
    public location: LocationService,
  ) {
    const currentYear = new Date().getFullYear()
    this.minDate = new Date(currentYear - 100, 0, 1)
    this.maxDate = new Date(currentYear - 13, 11, 31)

    this.form = this.fb.group({
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
    this.isLoading = true
    void this.auth
      .sendExtraData(this.form.value as ExtraDataSentForm)
      .then(() => (this.isLoading = false))
  }
}
