import { CommonModule } from '@angular/common'
import { DonationsComponent } from './containers/donations/donations.component'
import { DonorRoutingModule } from './donor-routing.module'
import { HomeComponent } from './containers/home/home.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { NgModule } from '@angular/core'
import { ProjectsComponent } from './containers/projects/projects.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [HomeComponent, ProjectsComponent, DonationsComponent],
  imports: [
    CommonModule,
    DonorRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    SharedModule,
  ],
})
export class DonorModule {}
