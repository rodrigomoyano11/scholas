import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { lastValueFrom, Observable, of } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth/auth.service'
import { DialogComponent, DialogData } from 'src/app/core/components/dialog/dialog.component'
import { GetUsersResponse } from 'src/app/core/models/api.interface'
import { User } from 'src/app/core/models/user.interface'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AdminsService {
  users$: Observable<GetUsersResponse>
  admins$: Observable<GetUsersResponse>

  constructor(private http: HttpClient, private auth: AuthService, private dialog: MatDialog) {
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
    void this.auth
      .setPermissions('admin', uid)

      .then(
        (hasError) =>
          hasError &&
          lastValueFrom(
            this.dialog
              .open<DialogComponent, DialogData>(DialogComponent, {
                data: {
                  actions: [null, 'Cerrar'],
                  title: 'Importante',
                  description:
                    'Para que se apliquen los cambios, el nuevo administrador deberá cerrar sesión y volver a ingresar a su cuenta.',
                  icon: 'info',
                },
              })
              .afterClosed(),
          ),
      )
      .then(() => this.getAdmins())
  }

  async deleteAdmin(uid: User['uid']): Promise<void> {
    const isApproved = (await lastValueFrom(
      this.dialog
        .open<DialogComponent, DialogData>(DialogComponent, {
          data: {
            actions: ['No', 'Sí, eliminar'],
            title: null,
            description: '¿Estás seguro de eliminar a este administrador?',
          },
        })
        .afterClosed(),
    )) as boolean

    if (isApproved) void this.auth.setPermissions('donor', uid).then(() => this.getAdmins())
  }
}
