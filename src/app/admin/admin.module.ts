import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AdminRoutingModule } from './admin-routing.module'
import { HomeComponent } from './containers/home/home.component'
import { AdminsComponent } from './containers/admins/admins.component'
import { DonorsComponent } from './containers/donors/donors.component'
import { ProjectsComponent } from './containers/projects/projects.component'

@NgModule({
  declarations: [
    HomeComponent,
    AdminsComponent,
    DonorsComponent,
    ProjectsComponent
  ],
  imports: [CommonModule, AdminRoutingModule]
})
export class AdminModule {}
