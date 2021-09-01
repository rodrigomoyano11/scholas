import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth/auth.service'
import { User } from 'src/app/shared/models/user'
import { environment } from 'src/environments/environment'

interface UserResponse {
  display_name: string
  email: string
  phone_number: string | null
  photo_url: string | null
  provider_id: string
  uid: string
  custom_claims: { [key: string]: boolean }

  [key: string]: string | { [key: string]: string | boolean } | null
}

@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  users$: Observable<UserResponse[]>
  admins$: Observable<UserResponse[]>

  constructor(private http: HttpClient, private auth: AuthService) {
    this.users$ = of([])
    this.admins$ = of([])
  }

  getUsers(): void {
    this.http
      .get<UserResponse[]>(`${environment.apiUrl}/users`)
      .subscribe((users) => (this.users$ = of(users)))
  }

  getAdmins(): void {
    this.http
      .get<UserResponse[]>(`${environment.apiUrl}/users`)
      .subscribe((users) => (this.admins$ = of(users.filter((user) => user.custom_claims?.admin))))
  }

  selectUidAdmin(email: User['email']): string {
    let uid: string | undefined = ''
    this.users$.subscribe((users) => (uid = users.find((user) => user.email === email)?.uid))
    return uid
  }

  addAdmin(uid: User['uid']): void {
    void this.auth.setPermissions('admin', uid).then(() => this.getAdmins())
  }

  deleteAdmin(uid: User['uid']): void {
    void this.auth.setPermissions('donor', uid).then(() => this.getAdmins())
  }
}
