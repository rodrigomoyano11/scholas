import { CommonModule } from '@angular/common'
import { DonationsComponent } from './containers/donations/donations.component'
import { DonorRoutingModule } from './donor-routing.module'
import { HomeComponent } from './containers/home/home.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { NgModule } from '@angular/core'
import { ProjectsComponent } from './containers/projects/projects.component'
import { CoreModule } from '../core/core.module'
import { LandingPageComponent } from './containers/landing-page/landing-page.component'

@NgModule({
  declarations: [HomeComponent, ProjectsComponent, DonationsComponent, LandingPageComponent],
  imports: [
    CommonModule,
    DonorRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    CoreModule,
  ],
})
export class DonorModule {}
