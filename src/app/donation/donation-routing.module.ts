import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotFoundComponent } from '../core/containers/not-found/not-found.component'
import { IsAdminGuard } from '../core/guards/isAdmin/is-admin.guard'
import { IsDonorGuard } from '../core/guards/isDonor/is-donor.guard'
import {} from '../core/guards/isLogged/is-logged.guard'
import { CertificateComponent } from './containers/certificate/certificate.component'
import { DonationAmountsSettingsComponent } from './containers/donation-amounts-settings/donation-amounts-settings.component'
import { HomeComponent } from './containers/home/home.component'
import { NewDonationComponent } from './containers/new-donation/new-donation.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'donate/:id',
        canActivate: [IsDonorGuard],
        component: NewDonationComponent,
      },
      {
        path: 'donate/completed',
        canActivate: [IsDonorGuard],
        component: NewDonationComponent,
      },
      {
        path: 'certificate/:id',
        canActivate: [IsDonorGuard],
        component: CertificateComponent,
      },
      {
        path: 'settings',
        canActivate: [IsAdminGuard],
        component: DonationAmountsSettingsComponent,
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
export class DonationRoutingModule {}
