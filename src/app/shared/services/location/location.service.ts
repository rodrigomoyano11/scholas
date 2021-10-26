import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { GetProvincesAndLocalitiesResponse, GetProvincesResponse } from '../../models/api.interface'
import { Location } from '../../models/location.interface'

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locationData!: GetProvincesAndLocalitiesResponse

  constructor(private http: HttpClient) {
    void this.getLocationData()
  }

  async getLocationData(): Promise<void> {
    this.locationData = await this.http
      .get<GetProvincesAndLocalitiesResponse>(`${environment.apiUrl}/location`)
      .toPromise()
  }

  async getProvinces(): Promise<string[]> {
    !this.locationData && (await this.getLocationData())

    return this.locationData.map((location) => location.name)
  }

  async getIdByProvince(selectedProvince: Location['province']): Promise<number> {
    const provinces = await this.http
      .get<GetProvincesResponse>(`${environment.apiUrl}/province`)
      .toPromise()

    const provinceId = provinces.find((province) => province.name === selectedProvince)?.id

    return provinceId ?? 0
  }

  async getLocalitiesByProvince(province: string): Promise<string[]> {
    !this.locationData && (await this.getLocationData())

    const selectedProvince = this.locationData.find((location) => location.name === province)
    return selectedProvince?.localities.map((locality) => locality) ?? []
  }
}
