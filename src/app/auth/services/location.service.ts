import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

interface Location {
  name: string
  departments: string[]
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locations!: Observable<Location[]>

  constructor(private http: HttpClient) {}

  getLocationData(): void {
    this.locations = this.http.get<Location[]>(`${environment.apiUrl}/location`)
  }
}
