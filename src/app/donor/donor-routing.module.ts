import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotFoundComponent } from '../shared/containers/not-found/not-found.component'
import { IsDonorGuard } from '../shared/guards/isDonor/is-donor.guard'
import { IsLoggedGuard } from '../shared/guards/isLogged/is-logged.guard'
import { DonationsComponent } from './containers/donations/donations.component'
import { HomeComponent } from './containers/home/home.component'
import { LandingPageComponent } from './containers/landing-page/landing-page.component'
import { ProjectsComponent } from './containers/projects/projects.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: LandingPageComponent },

      {
        path: 'projects',
        component: ProjectsComponent,
        canActivate: [IsLoggedGuard, IsDonorGuard],
      },

      {
        path: 'donations',
        canActivate: [IsLoggedGuard, IsDonorGuard],
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
