import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth/auth.service'
import { GetUsersResponse } from 'src/app/shared/models/api'
import { User } from 'src/app/shared/models/user'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  users$: Observable<GetUsersResponse>
  admins$: Observable<GetUsersResponse>

  constructor(private http: HttpClient, private auth: AuthService) {
    this.users$ = of([])
    this.admins$ = of([])
  }

  getUsers(): void {
    this.http.get<GetUsersResponse>(`${environment.apiUrl}/users`).subscribe((users) => {
      this.users$ = of(users)
    })
  }

  getAdmins(): void {
    this.http
      .get<GetUsersResponse>(`${environment.apiUrl}/users`)
      .subscribe((users) => (this.admins$ = of(users.filter((user) => user.customClaims?.admin))))
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
