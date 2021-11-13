import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { environment } from 'src/environments/environment'
import { GetProvincesAndLocalitiesResponse, GetProvincesResponse } from '../../models/api.interface'
import { Location } from '../../models/location.interface'

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locationData!: GetProvincesAndLocalitiesResponse

  provincesData!: GetProvincesResponse

  constructor(private http: HttpClient) {
    void this.getLocationData()
  }

  async getLocationData(): Promise<void> {
    this.locationData = await lastValueFrom(
      this.http.get<GetProvincesAndLocalitiesResponse>(`${environment.apiUrl}/location`),
    )
  }

  async getProvinceData(): Promise<void> {
    this.provincesData = await lastValueFrom(
      this.http.get<GetProvincesResponse>(`${environment.apiUrl}/province`),
    )
  }

  async getProvinces(): Promise<string[]> {
    !this.locationData && (await this.getLocationData())

    return this.locationData.map((location) => location.name)
  }

  async getIdByProvince(selectedProvince: Location['province']): Promise<number> {
    if (!this.provincesData) await this.getProvinceData()
    const provinces = this.provincesData

    const provinceId = provinces.find((province) => province.name === selectedProvince)?.id

    return provinceId ?? 0
  }
  async getProvinceById(id: number): Promise<string> {
    if (!this.provincesData) await this.getProvinceData()
    const provinces = this.provincesData

    const provinceName = provinces.find((province) => province.id === id)?.name

    return provinceName ?? ''
  }

  async getLocalitiesByProvince(province: string): Promise<string[]> {
    !this.locationData && (await this.getLocationData())

    const selectedProvince = this.locationData.find((location) => location.name === province)
    return selectedProvince?.localities.map((locality) => locality) ?? []
  }
}
