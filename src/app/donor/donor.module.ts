import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DonorRoutingModule } from './donor-routing.module'
import { HomeComponent } from './containers/home/home.component'
import { ProjectsComponent } from './containers/projects/projects.component'
import { SharedModule } from '../shared/shared.module'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { DonationsComponent } from './containers/donations/donations.component'

@NgModule({
  declarations: [HomeComponent, ProjectsComponent, DonationsComponent],
  imports: [
    CommonModule,
    DonorRoutingModule,
    SharedModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class DonorModule {}
