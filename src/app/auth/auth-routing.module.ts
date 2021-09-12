import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotFoundComponent } from '../shared/containers/not-found/not-found.component'
import { ExtraDataComponent } from './containers/extra-data/extra-data.component'
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component'
import { HomeComponent } from './containers/home/home.component'
import { LoginComponent } from './containers/login/login.component'
import { RegisterComponent } from './containers/register/register.component'
import { VerifyEmailComponent } from './containers/verify-email/verify-email.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'verify-email', component: VerifyEmailComponent },
      { path: 'extra-data', component: ExtraDataComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
