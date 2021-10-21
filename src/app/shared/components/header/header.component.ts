import { Component } from '@angular/core'
import { AuthService } from 'src/app/auth/services/auth/auth.service'
import { LayoutService } from '../../services/layout/layout.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(public auth: AuthService, public layout: LayoutService) {}
}
