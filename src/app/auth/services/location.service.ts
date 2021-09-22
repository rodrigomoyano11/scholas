import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'

interface Location {
  name: string
  departments: string[]
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locationData!: Location[]

  constructor(private http: HttpClient) {
    void this.getLocationData()
  }

  async getLocationData(): Promise<void> {
    this.locationData = await this.http
      .get<Location[]>(`${environment.apiUrl}/location`)
      .toPromise()
  }

  async getProvinces(): Promise<string[]> {
    !this.locationData && (await this.getLocationData())

    return this.locationData.map((location) => location.name)
  }

  async getLocalitiesByProvince(province: string): Promise<string[]> {
    !this.locationData && (await this.getLocationData())

    const selectedProvince = this.locationData.find((location) => location.name === province)
    return selectedProvince?.departments.map((locality) => locality) ?? []
  }
}
