import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthRoutingModule } from './auth-routing.module'
import { RegisterComponent } from './containers/register/register.component'
import { LoginComponent } from './containers/login/login.component'
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component'

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ForgotPasswordComponent],
  imports: [CommonModule, AuthRoutingModule]
})
export class AuthModule {}
