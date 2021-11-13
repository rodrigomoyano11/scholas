import { Injectable } from '@angular/core'
import { CanActivate, CanActivateChild, CanLoad, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth/auth.service'
type GuardResult = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree

@Injectable({
  providedIn: 'root',
})
export class IsLoggedGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  // General
  async hasPermissions(): Promise<boolean> {
    try {
      const userIsLogged = await this.auth.userIsLogged()
      const userIsAdmin = await this.auth.userIsAdmin()

      if (!userIsLogged) {
        if (userIsAdmin) return true
        void this.router.navigate(['/auth/login'])
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
