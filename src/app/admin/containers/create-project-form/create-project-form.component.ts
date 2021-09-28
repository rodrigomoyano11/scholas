import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LocationService } from 'src/app/auth/services/location.service'
import { ProjectsService } from '../../../shared/services/projects/projects.service'
import { ValidationService } from '../../services/validation/validation.service'

@Component({
  selector: 'app-create-project-form',
  templateUrl: './create-project-form.component.html',
  styleUrls: ['./create-project-form.component.css'],
})
export class CreateProjectFormComponent implements OnInit {
  createProjectForm: FormGroup

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
    this.createProjectForm = this.fb.group({
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

    this.provinceControl = this.createProjectForm.controls['province']
    this.localityControl = this.createProjectForm.controls['locality']
  }

  async ngOnInit(): Promise<void> {
    this.provinceControl.disable()
    this.localityControl.disable()
    await this.getProvinces()
  }

  // General
  getErrors(controlName: string): string {
    return this.validation.getErrors(this.createProjectForm.controls[controlName])
  }

  submitProjectData(): void {
    const projectData = {
      name: this.createProjectForm.controls['name'].value as string,
      province: this.createProjectForm.controls['province'].value as string,
      locality: this.createProjectForm.controls['locality'].value as string,
      description: this.createProjectForm.controls['description'].value as string,
      targetAmount: this.createProjectForm.controls['targetAmount'].value as string,
      coverPhoto: (this.createProjectForm.controls['coverPhoto'].value as string[])[0],
      photos: this.createProjectForm.controls['photos'].value as string[],
      video: this.createProjectForm.controls['video'].value as string,
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
    this.createProjectForm.patchValue({
      coverPhoto: photosInBase64,
    })
  }
  setPhotos(photosInBase64: string[]): void {
    this.createProjectForm.patchValue({
      photos: photosInBase64,
    })
  }
}
