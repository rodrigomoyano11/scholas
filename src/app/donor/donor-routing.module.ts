import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotFoundComponent } from '../core/containers/not-found/not-found.component'

import { IsDonorGuard } from '../core/guards/isDonor/is-donor.guard'
import { IsNotAdminGuard } from '../core/guards/isNotAdmin/is-not-admin.guard'
import { DonationsComponent } from './containers/donations/donations.component'
import { HomeComponent } from './containers/home/home.component'
import { LandingPageComponent } from './containers/landing-page/landing-page.component'
import { ProjectsComponent } from './containers/projects/projects.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingPageComponent },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'projects',
        canActivate: [IsNotAdminGuard],
        component: ProjectsComponent,
      },
      {
        path: 'donations',
        canActivate: [IsDonorGuard],
        component: DonationsComponent,
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
export class DonorRoutingModule {}
