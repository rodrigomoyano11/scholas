import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { CanActivate, CanActivateChild, CanLoad, Router, UrlTree } from '@angular/router'
import { lastValueFrom, Observable } from 'rxjs'
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
      const userIsAdmin = await this.auth.userIsAdmin()

      if (!userIsAdmin) {
        void this.router.navigate(['/auth/login'])
        void lastValueFrom(
          this.dialog
            .open<DialogComponent, DialogData>(DialogComponent, {
              data: {
                actions: [null, 'Cerrar'],
                title: 'Importante',
                description:
                  'Debes iniciar sesión con una cuenta de administrador para poder ingresar',
                icon: 'info',
              },
            })
            .afterClosed(),
        )

        return false
      }
      return true
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
