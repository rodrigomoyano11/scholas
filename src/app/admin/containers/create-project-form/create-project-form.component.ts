import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LocationService } from 'src/app/shared/services/location/location.service'
import { ValidationService } from 'src/app/shared/services/validation/validation.service'
import { ProjectsService } from '../../../shared/services/projects/projects.service'

@Component({
  selector: 'app-create-project-form',
  templateUrl: './create-project-form.component.html',
  styleUrls: ['./create-project-form.component.css'],
})
export class CreateProjectFormComponent implements OnInit {
  form: FormGroup

  provinces: string[] = []
  localities: string[] = []
  provinceControl: AbstractControl
  localityControl: AbstractControl

  constructor(
    private fb: FormBuilder,
    private projects: ProjectsService,
    private location: LocationService,
    private validation: ValidationService,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      province: ['', [Validators.required]],
      locality: ['', [Validators.required]],
      description: ['', [Validators.required]],
      targetAmount: [
        '',
        [Validators.required, validation.isNumber(), validation.isValidTargetAmount()],
      ],
      coverPhoto: [''],
      photos: [''],
      video: ['', validation.isValidLink()],
    })

    this.provinceControl = this.form.controls['province']
    this.localityControl = this.form.controls['locality']
  }

  async ngOnInit(): Promise<void> {
    this.provinceControl.disable()
    this.localityControl.disable()
    await this.getProvinces()
  }

  // General
  getErrors(controlName: string): string {
    return this.validation.getErrors(this.form.controls[controlName])
  }

  submitProjectData(): void {
    const projectData = {
      name: this.form.controls['name'].value as string,
      province: this.form.controls['province'].value as string,
      locality: this.form.controls['locality'].value as string,
      description: this.form.controls['description'].value as string,
      targetAmount: this.form.controls['targetAmount'].value as string,
      coverPhoto: (this.form.controls['coverPhoto'].value as string[])[0],
      photos: this.form.controls['photos'].value as string[],
      video: this.form.controls['video'].value as string,
    }

    void this.projects.createProject(projectData)
  }

  // Location
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

  // Photos
  setCoverPhoto(photosInBase64: string[]): void {
    this.form.patchValue({
      coverPhoto: photosInBase64,
    })
  }
  setPhotos(photosInBase64: string[]): void {
    this.form.patchValue({
      photos: photosInBase64,
    })
  }
}
