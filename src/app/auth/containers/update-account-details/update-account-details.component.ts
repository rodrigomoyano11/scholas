import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { GetUserResponse } from 'src/app/core/models/api.interface'
import { environment } from 'src/environments/environment'
import { AuthService } from '../../services/auth/auth.service'
import { LocationService } from '../../../core/services/location/location.service'
import { ValidationService } from 'src/app/core/services/validation/validation.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { lastValueFrom } from 'rxjs'

export interface UpdateAccountDetailsForm {
  fullName: string
  birthday: string
  phoneNumber: string
  province: string
  locality: string
}

@Component({
  selector: 'app-update-account-details',
  templateUrl: './update-account-details.component.html',
  styleUrls: ['./update-account-details.component.css'],
})
export class UpdateAccountDetailsComponent implements OnInit {
  isLoading = true
  submitIsLoading = false

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
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {
    const currentYear = new Date().getFullYear()
    this.minDate = new Date(currentYear - 100, 0, 1)
    this.maxDate = new Date(currentYear - 13, 11, 31)

    this.form = this.fb.group({
      fullName: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, validation.isValidPhoneNumber()]],
      province: ['', [Validators.required]],
      locality: ['', [Validators.required]],
    })

    this.provinceControl = this.form.controls['province']
    this.localityControl = this.form.controls['locality']
  }

  ngOnInit(): void {
    this.provinceControl.disable()
    this.localityControl.disable()

    this.setInitialValues()
  }

  // General
  setInitialValues(): void {
    this.auth.user$.subscribe((user) => {
      user.uid &&
        void lastValueFrom(
          this.http.get<GetUserResponse>(`${environment.apiUrl}/users/${user.uid}`),
        )
          .then((response) =>
            this.form.patchValue({
              fullName: response.displayName,
              birthday: response.birthday,
              phoneNumber: response.phoneNumber,
              province: response.province.name,
              locality: response.locality,
            }),
          )
          .then(() => void this.setInitialLocationValues())
          .then(() => (this.isLoading = false))
    })
  }

  // Location
  async setInitialLocationValues(): Promise<void> {
    await this.getProvinces()
    await this.getLocalitiesByProvince(this.provinceControl.value as string)
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

  // Errors
  getErrors(controlName: string): string {
    return this.validation.getErrors(this.form.controls[controlName])
  }

  // Submit
  async submitExtraData(): Promise<void> {
    this.submitIsLoading = true
    await this.auth.editAccountDetails(this.form.value as UpdateAccountDetailsForm)
    this.snackBar.open('Los cambios han sido guardados correctamente', 'Cerrar', { duration: 5000 })
    await this.router.navigate(['auth/account'])
    window.location.reload()
  }
}
