import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotFoundComponent } from '../shared/containers/not-found/not-found.component'
import { IsLoggedGuard } from '../shared/guards/isLogged/is-logged.guard'
import { AccountDetailsComponent } from './containers/account-details/account-details.component'
import { ExtraDataComponent } from './containers/extra-data/extra-data.component'
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component'
import { HomeComponent } from './containers/home/home.component'
import { LoginComponent } from './containers/login/login.component'
import { RegisterComponent } from './containers/register/register.component'
import { UpdateAccountDetailsComponent } from './containers/update-account-details/update-account-details.component'
import { VerifyEmailComponent } from './containers/verify-email/verify-email.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'extra-data',
        canActivate: [IsLoggedGuard],
        component: ExtraDataComponent,
      },

      {
        path: 'login',
        component: LoginComponent,
        children: [{ path: '**', component: LoginComponent }],
      },

      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'verify-email',
        canActivate: [IsLoggedGuard],
        component: VerifyEmailComponent,
      },

      {
        path: 'account',
        canActivate: [IsLoggedGuard],
        component: AccountDetailsComponent,
      },
      {
        path: 'account/update',
        canActivate: [IsLoggedGuard],
        component: UpdateAccountDetailsComponent,
      },

      { path: '**', component: NotFoundComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
