import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/auth/services/auth/auth.service'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isLogged = false
  isEmailVerified = false

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.isEmailVerified = !!user?.emailVerified
      this.isLogged = !!user?.getIdToken(true)
    })
  }
}
