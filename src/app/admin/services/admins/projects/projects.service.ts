import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { GetProjectsResponse } from 'src/app/shared/models/api'
import { Project } from 'src/app/shared/models/project'
import { environment } from 'src/environments/environment'

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
