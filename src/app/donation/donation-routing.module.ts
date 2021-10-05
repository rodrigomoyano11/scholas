import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotFoundComponent } from '../shared/containers/not-found/not-found.component'
import { CertificateComponent } from './containers/certificate/certificate.component'
import { HomeComponent } from './containers/home/home.component'
import { NewDonationComponent } from './containers/new-donation/new-donation.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'donate/:id', component: NewDonationComponent },
      { path: 'certificate/:id', component: CertificateComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonationRoutingModule {}
