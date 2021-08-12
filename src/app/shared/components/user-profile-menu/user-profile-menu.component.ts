import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth/auth.service'

@Component({
  selector: 'app-user-profile-menu',
  templateUrl: './user-profile-menu.component.html',
  styleUrls: ['./user-profile-menu.component.css']
})
export class UserProfileMenuComponent implements OnDestroy {
  authState!: Subscription

  userType!: 'Donante' | 'Administrador' | string
  userName!: string | undefined

  constructor(public auth: AuthService) {
    this.authState = this.auth.authState$.subscribe(() => {
      this.userName = this.auth.user?.displayName?.split(' ')[0]
      this.selectTitle()
    })
  }

  selectTitle(): void {
    this.auth.claims?.admin
      ? (this.userType = 'Administrador')
      : (this.userType = this.userName || 'Donante')
  }

  ngOnDestroy(): void {
    this.authState.unsubscribe()
  }
}
