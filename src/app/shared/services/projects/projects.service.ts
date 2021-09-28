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
} from 'src/app/shared/models/Api'

import { Project } from 'src/app/shared/models/Project'
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

  async createProject(data: ProjectFormData): Promise<void> {
    const body: CreateProjectRequest = {
      name: data.name,
      description: data.description,
      targetAmount: +data.targetAmount,
      province: data.province,
      locality: data.locality,
      videoURL: data.video,
      coverPhotoURL: data.coverPhoto,
      photos: data.photos,
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
    visibility?: Project['visibility'],
    status?: Project['status'],
  ): Observable<GetProjectsResponse> {
    let params = new HttpParams({})

    if (status) params = params.set('status', this.paramsOptions.status[status])
    if (visibility) params = params.set('visibility', this.paramsOptions.visibility[visibility])

    return this.http.get<GetProjectsResponse>(`${environment.apiUrl}/projects?${params.toString()}`)
  }

  async setProjectVisibility(
    id: Project['id'],
    visibility: Project['visibility'],
  ): Promise<unknown | void> {
    const message = visibility === 'private' ? 'baja' : 'alta'
    const isApproved = (await this.dialog
      .open<DialogComponent, DialogData>(DialogComponent, {
        data: {
          actions: ['Cancelar', `Dar de ${message}`],
          title: null,
          description: `¿Estás seguro de dar de ${message} este proyecto?`,
        },
      })
      .afterClosed()
      .toPromise()) as boolean

    if (!isApproved) return

    return this.http
      .put<unknown>(`${environment.apiUrl}/projects/visibility/${id}`, {
        visibility: this.paramsOptions.visibility[visibility],
      })
      .toPromise()
  }
}
