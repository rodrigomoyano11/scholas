import { Injectable } from '@angular/core'
import { CanActivate, CanActivateChild, CanLoad, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth/auth.service'

type GuardFn = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree

@Injectable({
  providedIn: 'root',
})
export class IsDonorGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  // General
  async hasPermissions(): Promise<boolean> {
    try {
      const conditions = await Promise.all([this.auth.userIsLogged(), this.auth.userIsDonor()])
      const response = conditions.every((condition) => condition === true)
      if (!response) void this.router.navigate(['/auth/login'])
      return response
    } catch {
      return false
    }
  }

  // Guard Functions
  canActivate(): GuardFn {
    return this.hasPermissions()
  }
  canActivateChild(): GuardFn {
    return this.hasPermissions()
  }
  canLoad(): GuardFn {
    return this.hasPermissions()
  }
}
