import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { CanActivate, CanActivateChild, CanLoad, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth/auth.service'
import { DialogComponent, DialogData } from '../../components/dialog/dialog.component'

type GuardResult = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private auth: AuthService, private router: Router, private dialog: MatDialog) {}

  // General
  async hasPermissions(): Promise<boolean> {
    try {
      const conditions = await Promise.all([this.auth.userIsLogged(), this.auth.userIsAdmin()])

      const response = conditions.every((condition) => condition === true)
      if (!response) {
        void this.router.navigate(['/auth/login'])
        void this.dialog
          .open<DialogComponent, DialogData>(DialogComponent, {
            data: {
              actions: [null, 'Cerrar'],
              title: 'Importante',
              description:
                'Debes iniciar sesión con una cuenta de administrador para poder ingresar',
              icon: 'info',
            },
          })
          .afterClosed()
          .toPromise()
      }
      return response
    } catch {
      return false
    }
  }

  // Guard Functions
  canActivate(): GuardResult {
    return this.hasPermissions()
  }
  canActivateChild(): GuardResult {
    return this.hasPermissions()
  }
  canLoad(): GuardResult {
    return this.hasPermissions()
  }
}
