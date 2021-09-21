import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LocationService } from 'src/app/auth/services/location.service'
import { ProjectsService } from '../../services/admins/projects/projects.service'
import { ValidationService } from '../../services/validation/validation.service'

@Component({
  selector: 'app-project-data-form',
  templateUrl: './project-data-form.component.html',
  styleUrls: ['./project-data-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDataFormComponent implements OnInit {
  projectDataForm: FormGroup

  provinces: { value: string }[] = []
  localities: { value: string }[] = []

  provinceHasData = false
  localityHasData = false

  photos: (string | null)[] = [null, null, null, null, null]

  constructor(
    private fb: FormBuilder,

    private projects: ProjectsService,
    private locationService: LocationService,
    private validation: ValidationService,
    private cd: ChangeDetectorRef,
  ) {
    this.projectDataForm = this.fb.group({
      name: ['', [Validators.required]],
      province: [{ value: '', disabled: !this.provinceHasData }, [Validators.required]],
      locality: [{ value: '', disabled: !this.localityHasData }, [Validators.required]],
      description: ['', [Validators.required]],
      targetAmount: [
        '',
        [Validators.required, validation.isNumber(), validation.isValidTargetAmount()],
      ],
      coverPhoto: ['', [Validators.required]],
      photos: ['', [Validators.required]],
      video: ['', validation.isValidLink()],
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

  // Error handler
  getErrors(controlName: string): string {
    return this.validation.getErrors(this.projectDataForm.controls[controlName])
  }

  // General
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
    const filteredPhotos = this.photos.filter((photo) => photo !== null)
    this.projectDataForm.patchValue({
      photos: filteredPhotos,
    })

    const projectData = {
      name: this.projectDataForm.controls['name'].value as string,
      province: this.projectDataForm.controls['province'].value as string,
      locality: this.projectDataForm.controls['locality'].value as string,
      description: this.projectDataForm.controls['description'].value as string,
      targetAmount: this.projectDataForm.controls['targetAmount'].value as string,
      coverPhoto: this.projectDataForm.controls['coverPhoto'].value as string,
      photos: this.projectDataForm.controls['photos'].value as string[],
      video: this.projectDataForm.controls['video'].value as string,
    }

    void this.projects.createProject(projectData)
  }

  // Photos
  setCoverPhoto(PhotoInBase64: string): void {
    this.projectDataForm.patchValue({
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
