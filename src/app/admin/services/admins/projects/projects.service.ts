import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { DialogComponent, DialogData } from 'src/app/shared/components/dialog/dialog.component'
import {
  CreateProjectRequest,
  CreateProjectResponse,
  GetProjectResponse,
  GetProjectsResponse,
} from 'src/app/shared/models/api'

import { Project } from 'src/app/shared/models/project'
import { environment } from 'src/environments/environment'

interface ProjectFormData {
  name: string
  province: string
  locality: string
  description: string
  targetAmount: string
  coverPhoto: string
  photos: string[]
  video: string
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  paramsOptions = {
    status: {
      started: 'STARTED',
      inProgress: 'IN_PROGRESS',
      finished: 'FINISHED',
    },
    visibility: {
      public: 'PUBLIC',
      private: 'PRIVATE',
    },
  }

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {}

  async createProject({
    name,
    description,
    locality,
    province,
    targetAmount,
    coverPhoto,
    photos,
    video,
  }: ProjectFormData): Promise<void> {
    console.log(name, description, locality, province, targetAmount, coverPhoto, photos, video)

    const body: CreateProjectRequest = {
      name,
      description,
      visibility: 'PUBLIC',
      targetAmount: +targetAmount,
      locality,
      province,
      coverPhotoURL: coverPhoto,
      photos,
      videoURL: video,
    }

    await this.http.post<CreateProjectResponse>(`${environment.apiUrl}/projects`, body).toPromise()

    await this.dialog
      .open<DialogComponent, DialogData>(DialogComponent, {
        data: {
          actions: [null, 'Cerrar'],
          title: 'Alta de proyecto completada',
          description: 'El proceso de alta de proyecto ha sido completado exitosamente',
          icon: 'check_circle',
        },
      })
      .afterClosed()
      .toPromise()

    await this.router.navigate(['/admin/projects'])
  }

  getProject(id: Project['id']): Observable<GetProjectResponse> {
    return this.http.get<GetProjectResponse>(`${environment.apiUrl}/projects/${id}`)
  }

  getProjects(
    status?: Project['status'],
    visibility?: Project['visibility'],
  ): Observable<GetProjectsResponse> {
    let params = new HttpParams({})

    if (status) params = params.set('status', this.paramsOptions.status[status])
    if (visibility) params = params.set('visibility', this.paramsOptions.visibility[visibility])

    return this.http.get<GetProjectsResponse>(`${environment.apiUrl}/projects?${params.toString()}`)
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  setProjectVisibility(id: Project['id'], visibility: Project['visibility']): Promise<Object> {
    return this.http
      .put(`${environment.apiUrl}/projects/visibility/${id}`, {
        visibility: this.paramsOptions.visibility[visibility],
      })
      .toPromise()
  }
}
