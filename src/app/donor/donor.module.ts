import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DonorRoutingModule } from './donor-routing.module'
import { HomeComponent } from './containers/home/home.component'
import { ProjectsComponent } from './containers/projects/projects.component'
import { NewsComponent } from './containers/news/news.component'
import { SharedModule } from '../shared/shared.module'
import { MatListModule } from '@angular/material/list'
import { AccountDetailsComponent } from './containers/account-details/account-details.component'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [HomeComponent, ProjectsComponent, NewsComponent, AccountDetailsComponent],
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
