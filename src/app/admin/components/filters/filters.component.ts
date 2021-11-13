import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms'
import { LocationService } from 'src/app/core/services/location/location.service'
import { ValidationService } from 'src/app/core/services/validation/validation.service'

export interface FiltersFormData {
  age1: string | null
  age2: string | null
  amount1: string | null
  amount2: string | null
  province: string | null
  paymentType: boolean
}

interface FormData {
  province: string
  age1: string
  age2: string
  donatedAmount1: string
  donatedAmount2: string
  paymentType: boolean | string
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  @Output() dataSubmitted = new EventEmitter<FiltersFormData>()

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
      province: '',

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
    const {
      age1,
      age2,
      donatedAmount1: amount1,
      donatedAmount2: amount2,
      province,
      paymentType,
    } = this.form.value as FormData

    const formData: FiltersFormData = {
      age1: age1 !== '' ? age1 : null,
      age2: age2 !== '' ? age2 : null,
      amount1: amount1 !== '' ? amount1 : null,
      amount2: amount2 !== '' ? amount2 : null,
      province: province !== '' ? province : null,
      paymentType: paymentType !== '' ? !!paymentType : false,
    }

    this.dataSubmitted.emit(formData)
  }

  cleanFilters(): void {
    this.form.patchValue({
      province: '',

      age1: '',
      age2: '',

      donatedAmount1: '',
      donatedAmount2: '',

      paymentType: '',
    })

    this.submitExtraData()
  }
}
