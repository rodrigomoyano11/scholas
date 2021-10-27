import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth/auth.service'
type GuardResult = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree

@Injectable({
  providedIn: 'root',
})
export class IsLoggedGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  // General
  async hasPermissions(route: ActivatedRouteSnapshot): Promise<boolean> {
    try {
      const withId = !!route.data['withId']
      const id = withId ? route.paramMap.get('id') : undefined

      const redirectTo = (route.data['redirectTo'] ?? '/auth/login') as string

      const conditions = await Promise.all([this.auth.userIsLogged()])

      const response = conditions.every((condition) => condition === true)
      if (!response) void this.router.navigate([redirectTo, withId ? id : ''])
      return response
    } catch {
      return false
    }
  }

  // Guard Functions
  canActivate(route: ActivatedRouteSnapshot): GuardResult {
    return this.hasPermissions(route)
  }
  canActivateChild(route: ActivatedRouteSnapshot): GuardResult {
    return this.hasPermissions(route)
  }
  canLoad(): GuardResult {
    return Promise.all([this.auth.userIsLogged()])
      .then((conditions) => {
        const response = conditions.every((condition) => condition === true)
        if (!response) void this.router.navigate(['/auth/login'])
        return response
      })
      .catch(() => false)
  }
}
