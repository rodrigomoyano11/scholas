import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { lastValueFrom, Observable } from 'rxjs'
import { GetDonorsByFiltersResponse, GetMetricsResponse } from 'src/app/shared/models/api.interface'
import { Project } from 'src/app/shared/models/project.interface'
import { environment } from 'src/environments/environment'

export interface GetDonorsByFiltersArgs {
  projectId?: Project['id']
  page?: number
  size?: number

  // Filters
  type?: 'regular' | 'recurring'
  provinceId?: number

  age1?: number
  age2?: number

  mount1?: number
  mount2?: number

  // Orders
  orderAlphabetically?: 'ascending' | 'descending'
  orderRecentOrAncient?: 'ascending' | 'descending'

  orderByDonationCount?: 'ascending' | 'descending'
  orderByDonationAmount?: 'ascending' | 'descending'
}

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  constructor(private http: HttpClient) {}

  getChartData(id: Project['id']): Observable<GetMetricsResponse> {
    return this.http.get<GetMetricsResponse>(`${environment.apiUrl}/metrics/chart?projectId=${id}`)
  }

  async getDonorsByFilters({
    projectId,

    page,
    size,

    type,
    provinceId,

    age1,
    age2,

    mount1,
    mount2,

    orderAlphabetically,
    orderRecentOrAncient,
    orderByDonationCount,
    orderByDonationAmount,
  }: GetDonorsByFiltersArgs): Promise<GetDonorsByFiltersResponse['body']> {
    let params = new HttpParams({})

    if (projectId) params = params.set('projectId', projectId)

    if (page) params = params.set('page', page)
    if (size) params = params.set('size', size)

    // Filters
    if (type && type === 'recurring') params = params.set('type', type)
    if (provinceId) params = params.set('provinceId', provinceId)

    if (age1) params = params.set('age1', age1)
    if (age2) params = params.set('age2', age2)

    if (mount1) params = params.set('mount1', mount1)
    if (mount2) params = params.set('mount2', mount2)

    // Orders
    const isOnlyOrder =
      [
        orderAlphabetically,
        orderRecentOrAncient,
        orderByDonationCount,
        orderByDonationAmount,
      ].filter((order) => !!order).length <= 1

    if (isOnlyOrder) {
      if (orderAlphabetically) {
        params = params.set('orderAlphabetically', orderAlphabetically === 'ascending' ? 1 : 2)
      }
      if (orderRecentOrAncient) {
        params = params.set('orderRecentOrAncient', orderRecentOrAncient === 'ascending' ? 1 : 2)
      }
      if (orderByDonationCount) {
        params = params.set('donationCount', orderByDonationCount === 'ascending' ? 'ASC' : 'DES')
      }
      if (orderByDonationAmount) {
        params = params.set('donationAmount', orderByDonationAmount === 'ascending' ? 'ASC' : 'DES')
      }
    } else {
      throw new Error('getDonorsByFilters --> This function only receives a single order ')
    }

    const response = (
      await lastValueFrom(
        this.http.get<GetDonorsByFiltersResponse>(
          `${environment.apiUrl}/metrics?${params.toString()}`,
        ),
      )
    ).body

    return response
  }
}
