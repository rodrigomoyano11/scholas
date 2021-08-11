import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthRoutingModule } from './auth-routing.module'
import { RegisterComponent } from './containers/register/register.component'
import { LoginComponent } from './containers/login/login.component'
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component'
import { SharedModule } from '../shared/shared.module'
import { HomeComponent } from './containers/home/home.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { ModalContainerComponent } from './components/modal-container/modal-container.component'
import { ReactiveFormsModule } from '@angular/forms'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { VerifyEmailComponent } from './containers/verify-email/verify-email.component'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { ExtraDataComponent } from './containers/extra-data/extra-data.component'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatIconModule } from '@angular/material/icon'
import SocialButtonComponent from './components/social-button/social-button.component'

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HomeComponent,
    ModalContainerComponent,
    VerifyEmailComponent,
    ExtraDataComponent,
    SocialButtonComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ]
})
export class AuthModule {}
