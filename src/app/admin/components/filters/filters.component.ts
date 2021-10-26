import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms'
import { LocationService } from 'src/app/shared/services/location/location.service'
import { ValidationService } from '../../services/validation/validation.service'

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  form: FormGroup

  provinces: string[] = []
  localities: string[] = []
  provinceControl: AbstractControl

  constructor(
    private validation: ValidationService,
    private fb: FormBuilder,
    public location: LocationService,
  ) {
    this.form = this.fb.group({
      province: ['', []],

      age1: '',
      age2: '',

      donatedAmount1: '',
      donatedAmount2: '',

      paymentType: '',
    })

    this.provinceControl = this.form.controls['province']
  }

  async ngOnInit(): Promise<void> {
    this.provinceControl.disable()
    await this.getProvinces()
  }

  async getProvinces(): Promise<void> {
    this.provinces = await this.location.getProvinces()
    const provinceHasData = !!this.provinces.length
    provinceHasData && this.provinceControl.enable()
  }

  getErrors(controlName: string): string {
    return this.validation.getErrors(this.form.controls[controlName])
  }

  submitExtraData(): void {
    console.log(this.form.value)
  }
}
