import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { lastValueFrom, Observable } from 'rxjs'
import { GetDonorsByProjectResponse, GetMetricsResponse } from 'src/app/shared/models/api.interface'
import { Project } from 'src/app/shared/models/project.interface'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  constructor(private http: HttpClient) {}

  getChartData(id: Project['id']): Observable<GetMetricsResponse> {
    return this.http.get<GetMetricsResponse>(`${environment.apiUrl}/metrics/chart?projectId=${id}`)
  }

  async getDonorsByProject(id: Project['id']): Promise<GetDonorsByProjectResponse['body']> {
    const response = (
      await lastValueFrom(
        this.http.get<GetDonorsByProjectResponse>(`${environment.apiUrl}/metrics?projectId=${id}`),
      )
    ).body

    return response
  }
}
