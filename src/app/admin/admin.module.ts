import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AdminRoutingModule } from './admin-routing.module'
import { HomeComponent } from './containers/home/home.component'
import { AdminsComponent } from './containers/admins/admins.component'
import { DonorsComponent } from './containers/donors/donors.component'
import { ProjectsComponent } from './containers/projects/projects.component'
import { NewsComponent } from './containers/news/news.component'
import { SharedModule } from '../shared/shared.module'
import { DonationsComponent } from './containers/donations/donations.component'
import { NewAdminComponent } from './containers/new-admin/new-admin.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'

@NgModule({
  declarations: [
    HomeComponent,
    AdminsComponent,
    DonorsComponent,
    ProjectsComponent,
    NewsComponent,
    DonationsComponent,
    NewAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule
  ]
})
export class AdminModule {}
