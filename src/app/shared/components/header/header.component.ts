import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  authState!: Subscription

  userType!: 'Donante' | 'Administrador' | string

  constructor(public auth: AuthService) {
    this.authState = this.auth.authState$.subscribe(() => {
      this.selectTitle()
    })
  }

  selectTitle(): void {
    this.auth.claims?.admin
      ? (this.userType = 'Administrador')
      : (this.userType = this.auth.user?.displayName || 'Donante')
  }

  ngOnDestroy(): void {
    this.authState.unsubscribe()
  }
}
