import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CreateProjectRequest, GetProjectsResponse } from 'src/app/shared/models/api'
import { Project } from 'src/app/shared/models/project'
import { environment } from 'src/environments/environment'

interface CreateProjectData {
  name: string
  province: string
  locality: string
  description: string
  targetAmount: string
  // coverPhoto: "",
  // photos: "",
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

  constructor(private http: HttpClient) {}

  createProject({
    name,
    description,
    locality,
    province,
    targetAmount,
    video,
  }: CreateProjectData): Observable<CreateProjectRequest> {
    return this.http.post<CreateProjectRequest>(`${environment.apiUrl}/projects`, {
      name,
      description,
      visibility: 'PUBLIC',
      targetAmount,
      currentAmount: 0,
      locality,
      province,
      coverPhotoURL: 'https://i.ytimg.com/vi/SJk607lIjZg/maxresdefault.jpg',
      photos: [
        'https://i.ytimg.com/vi/SJk607lIjZg/maxresdefault.jpg',
        'https://i.ytimg.com/vi/SJk607lIjZg/maxresdefault.jpg',
        'https://i.ytimg.com/vi/SJk607lIjZg/maxresdefault.jpg',
      ],
      videoURL: video,
      donorsQuantity: 0,
      donationsQuantity: 0,
    })
  }

  getProject(id: Project['id']): Observable<GetProjectsResponse> {
    return this.http.get<GetProjectsResponse>(`${environment.apiUrl}/projects/${id}`)
  }

  getProjects(
    status?: Project['status'],
    visibility?: Project['visibility'],
  ): Observable<GetProjectsResponse[]> {
    let params = new HttpParams({})

    if (status) params = params.set('status', this.paramsOptions.status[status])
    if (visibility) params = params.set('visibility', this.paramsOptions.visibility[visibility])

    return this.http.get<GetProjectsResponse[]>(
      `${environment.apiUrl}/projects?${params.toString()}`,
    )
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
