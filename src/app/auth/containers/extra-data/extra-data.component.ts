import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth/auth.service'
import { LocationService } from '../../services/location.service'
import { ValidationService } from '../../services/validation/validation.service'

@Component({
  selector: 'app-extra-data',
  templateUrl: './extra-data.component.html',
  styleUrls: ['./extra-data.component.css'],
})
export class ExtraDataComponent implements OnInit {
  extraDataForm: FormGroup

  minDate: Date
  maxDate: Date

  provinces: { value: string }[] = []
  departments: { value: string }[] = []

  provinceHasData = false
  departmentHasData = false

  constructor(
    private validation: ValidationService,
    private fb: FormBuilder,
    private auth: AuthService,
    private locationService: LocationService,
  ) {
    const currentYear = new Date().getFullYear()
    this.minDate = new Date(currentYear - 100, 0, 1)
    this.maxDate = new Date(currentYear - 13, 11, 31)

    this.extraDataForm = this.fb.group({
      birthday: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, validation.isValidPhoneNumber()]],
      province: [{ value: '', disabled: !this.provinceHasData }, [Validators.required]],
      department: [{ value: '', disabled: !this.departmentHasData }, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.locationService.getLocationData()

    const control = this.extraDataForm.controls['province']
    this.locationService.locations.subscribe((locations) => {
      locations.map((location) => (this.provinces = [...this.provinces, { value: location.name }]))
      !!this.provinces.length ? control.enable() : control.disable()
    })
  }

  getDepartmentsByProvince(province: string): void {
    this.locationService.locations.subscribe((locations) => {
      const control = this.extraDataForm.controls['department']
      this.departments = []
      locations
        .find((location) => location.name === province)
        ?.departments.map(
          (department) => (this.departments = [...this.departments, { value: department }]),
        )
      province !== '' && !!this.departments.length ? control.enable() : control.disable()
    })
  }

  getErrors(controlName: string): string {
    return this.validation.getErrors(this.extraDataForm.controls[controlName])
  }

  submitExtraData(): void {
    void this.auth.sendExtraData(this.extraDataForm.value)
  }
}
