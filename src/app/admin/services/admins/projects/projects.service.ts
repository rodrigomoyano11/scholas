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
  constructor(private http: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  selectParamsOptions() {
    const options = {
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

    return options
  }

  getProject(id: Project['id']): Observable<GetProjectsResponse> {
    return this.http.get<GetProjectsResponse>(`${environment.apiUrl}/projects/${id}`)
  }

  getProjects(
    status?: Project['status'],
    visibility?: Project['visibility'],
  ): Observable<GetProjectsResponse[]> {
    const params = new HttpParams()

    status && params.set(status, this.selectParamsOptions().status[status])
    visibility && params.set(visibility, this.selectParamsOptions().visibility[visibility])

    return this.http.get<GetProjectsResponse[]>(
      `${environment.apiUrl}/projects?${params.toString()}`,
    )
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  setProjectVisibility(id: Project['id'], visibility: Project['visibility']): Promise<Object> {
    return this.http
      .put(`${environment.apiUrl}/projects/visibility/${id}`, {
        visibility: this.selectParamsOptions().visibility[visibility],
      })
      .toPromise()
  }
}

/* {{apiUrl}}/projects/:id */
