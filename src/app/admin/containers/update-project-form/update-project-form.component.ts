import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { LocationService } from 'src/app/auth/services/location.service'
import { ProjectsService } from '../../../shared/services/projects/projects.service'
import { ValidationService } from '../../services/validation/validation.service'

@Component({
  selector: 'app-update-project-form',
  templateUrl: './update-project-form.component.html',
  styleUrls: ['./update-project-form.component.css'],
})
export class UpdateProjectFormComponent implements OnInit {
  form: FormGroup

  selectedProjectId: string | null = this.route.snapshot.paramMap.get('id')

  provinces: string[] = []
  localities: string[] = []
  provinceControl: AbstractControl
  localityControl: AbstractControl

  coverPhotoData: string[] = []
  photosData: string[] = []

  constructor(
    private fb: FormBuilder,
    private projects: ProjectsService,
    private location: LocationService,
    private validation: ValidationService,
    private route: ActivatedRoute,
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

    await this.setInitialValues()
    await this.setInitialLocationValues()
  }

  // General
  async setInitialValues(): Promise<void> {
    if (!!this.selectedProjectId) {
      const {
        name,
        province,
        locality,
        description,
        targetAmount,
        coverPhotoURL,
        photos,
        videoURL,
      } = await this.projects.getProject(Number(this.selectedProjectId)).toPromise()

      this.coverPhotoData = coverPhotoURL ? [coverPhotoURL] : []
      this.photosData = photos ?? []

      this.form.patchValue({
        name,
        province,
        locality,
        description,
        targetAmount,
        video: videoURL,
      })
    }
  }

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

    void this.projects.editProject(Number(this.selectedProjectId), projectData)
  }

  // Location
  async setInitialLocationValues(): Promise<void> {
    await this.getProvinces()
    await this.getLocalitiesByProvince(this.provinceControl.value)
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
