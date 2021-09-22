import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { LocationService } from 'src/app/auth/services/location.service'
import { ProjectsService } from '../../services/admins/projects/projects.service'
import { ValidationService } from '../../services/validation/validation.service'

@Component({
  selector: 'app-edit-project-form',
  templateUrl: './edit-project-form.component.html',
  styleUrls: ['./edit-project-form.component.css'],
})
export class EditProjectFormComponent implements OnInit {
  editProjectForm: FormGroup

  selectedProjectId: string | null = this.route.snapshot.paramMap.get('id')

  photos: (string | null)[] = [null, null, null, null, null]

  provinces: string[] = []
  localities: string[] = []
  provinceControl: AbstractControl
  localityControl: AbstractControl

  constructor(
    private fb: FormBuilder,
    private projects: ProjectsService,
    private location: LocationService,
    private validation: ValidationService,
    private route: ActivatedRoute,
  ) {
    this.editProjectForm = this.fb.group({
      name: ['', [Validators.required]],
      province: ['', [Validators.required]],
      locality: ['', [Validators.required]],
      description: ['', [Validators.required]],
      targetAmount: [
        '',
        [Validators.required, validation.isNumber(), validation.isValidTargetAmount()],
      ],
      coverPhoto: ['', [Validators.required]],
      photos: ['', [Validators.required]],
      video: ['', validation.isValidLink()],
    })

    this.provinceControl = this.editProjectForm.controls['province']
    this.localityControl = this.editProjectForm.controls['locality']
  }

  async ngOnInit(): Promise<void> {
    this.provinceControl.disable()
    this.localityControl.disable()

    await this.setInitialValues()
    await this.setInitialLocationValues()
  }

  // General
  async setInitialValues(): Promise<void> {
    if (this.selectedProjectId) {
      const {
        name,
        province,
        locality,
        description,
        targetAmount,
        coverPhotoURL,
        photos,
        videoURL,
      } = await this.projects.getProject(this.selectedProjectId).toPromise()

      this.editProjectForm.patchValue({
        name,
        province,
        locality,
        description,
        targetAmount,
        coverPhoto: coverPhotoURL,
        photos,
        video: videoURL,
      })
    }
  }

  getErrors(controlName: string): string {
    return this.validation.getErrors(this.editProjectForm.controls[controlName])
  }

  submitProjectData(): void {
    const filteredPhotos = this.photos.filter((photo) => photo !== null)
    this.editProjectForm.patchValue({
      photos: filteredPhotos,
    })

    const projectData = {
      name: this.editProjectForm.controls['name'].value as string,
      province: this.editProjectForm.controls['province'].value as string,
      locality: this.editProjectForm.controls['locality'].value as string,
      description: this.editProjectForm.controls['description'].value as string,
      targetAmount: this.editProjectForm.controls['targetAmount'].value as string,
      coverPhoto: this.editProjectForm.controls['coverPhoto'].value as string,
      photos: this.editProjectForm.controls['photos'].value as string[],
      video: this.editProjectForm.controls['video'].value as string,
    }

    console.log(projectData)
    // void this.projects.createProject(projectData)
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
  setCoverPhoto(PhotoInBase64: string): void {
    this.editProjectForm.patchValue({
      coverPhoto: PhotoInBase64,
    })
  }

  setPhotos(PhotoInBase64: string, i: number): void {
    this.photos[i] = PhotoInBase64
  }

  deletePhoto(i: number): void {
    this.photos[i] = null
  }
}
