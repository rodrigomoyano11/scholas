import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LocationService } from 'src/app/auth/services/location.service'

@Component({
  selector: 'app-project-data-form',
  templateUrl: './project-data-form.component.html',
  styleUrls: ['./project-data-form.component.css'],
})
export class ProjectDataFormComponent implements OnInit {
  projectDataForm: FormGroup

  provinces: { value: string }[] = []
  localities: { value: string }[] = []

  provinceHasData = false
  localityHasData = false

  constructor(private fb: FormBuilder, private locationService: LocationService) {
    this.projectDataForm = this.fb.group({
      name: ['', [Validators.required]],
      province: [{ value: '', disabled: !this.provinceHasData }, [Validators.required]],
      locality: [{ value: '', disabled: !this.localityHasData }, [Validators.required]],
      description: ['', [Validators.required]],
      targetAmount: ['', [Validators.required]],
      coverPhoto: ['', [Validators.required]],
      photos: ['', [Validators.required]],
      video: ['', [Validators.required]],
    })
  }
  ngOnInit(): void {
    this.locationService.getLocationData()

    const control = this.projectDataForm.controls['province']
    this.locationService.locations.subscribe((locations) => {
      locations.map((location) => (this.provinces = [...this.provinces, { value: location.name }]))
      !!this.provinces.length ? control.enable() : control.disable()
    })
  }

  getErrors(controlName: string): string {
    return 'error ' + controlName
    // return this.validation.getErrors(this.projectDataForm.controls[controlName])
  }

  getDepartmentsByProvince(province: string): void {
    this.locationService.locations.subscribe((locations) => {
      const control = this.projectDataForm.controls['locality']
      this.localities = []
      locations
        .find((location) => location.name === province)
        ?.departments.map(
          (locality) => (this.localities = [...this.localities, { value: locality }]),
        )
      province !== '' && !!this.localities.length ? control.enable() : control.disable()
    })
  }

  submitProjectData(): void {
    console.log('ProjectDataForm submitted')
    // void this.auth.sendExtraData(this.projectDataForm.value)
  }
}
