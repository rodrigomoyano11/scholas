/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth/auth.service'
import { User } from 'src/app/shared/models/user'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  admins$: Observable<User[]>

  constructor(private http: HttpClient, private auth: AuthService) {
    this.admins$ = of([])
  }

  getAdmins(): void {
    this.http
      .get<User[]>(`${environment.apiUrl}/users`)
      .subscribe((users) => (this.admins$ = of(users.filter((user) => user.custom_claims.admin))))
  }

  addAdmin(uid: User['uid']): void {
    this.auth.setPermissions('admin', uid).subscribe(() => this.getAdmins())
  }

  deleteAdmin(uid: User['uid']): void {
    this.auth.setPermissions('donor', uid).subscribe(() => this.getAdmins())
  }
}
