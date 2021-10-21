import { AccountDetailsComponent } from './containers/account-details/account-details.component'
import { AuthRoutingModule } from './auth-routing.module'
import { CommonModule } from '@angular/common'
import { ExtraDataComponent } from './containers/extra-data/extra-data.component'
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component'
import { HomeComponent } from './containers/home/home.component'
import { LoginComponent } from './containers/login/login.component'
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatNativeDateModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RegisterComponent } from './containers/register/register.component'
import { SharedModule } from '../shared/shared.module'
import { UpdateAccountDetailsComponent } from './containers/update-account-details/update-account-details.component'
import { VerifyEmailComponent } from './containers/verify-email/verify-email.component'
import SocialButtonComponent from './components/social-button/social-button.component'

@NgModule({
  declarations: [
    AccountDetailsComponent,
    ExtraDataComponent,
    ForgotPasswordComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SocialButtonComponent,
    UpdateAccountDetailsComponent,
    VerifyEmailComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AuthModule {}
