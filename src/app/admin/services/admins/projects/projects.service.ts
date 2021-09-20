/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
  // TODO: Get all projects

  constructor(private http: HttpClient) {}

  selectParamOption() {
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

  getProjects(
    status: Project['status'] = 'started',
    visibility: Project['visibility'] = 'public',
  ): Observable<GetProjectsResponse[]> {
    const params = new HttpParams({
      fromObject: {
        status: this.selectParamOption().status[status],
        visibility: this.selectParamOption().visibility[visibility],
      },
    })

    return this.http.get<GetProjectsResponse[]>(
      `${environment.apiUrl}/projects?${params.toString()}`,
    )
  }
}
