import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthRoutingModule } from './auth-routing.module'
import { RegisterComponent } from './containers/register/register.component'
import { LoginComponent } from './containers/login/login.component'
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component'
import { SharedModule } from '../shared/shared.module'
import { HomeComponent } from './containers/home/home.component'

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HomeComponent
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule]
})
export class AuthModule {}
