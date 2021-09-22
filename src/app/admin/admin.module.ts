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
import { ListHeaderComponent } from './components/list-header/list-header.component'
import { MatTooltipModule } from '@angular/material/tooltip'
import { ListItemComponent } from './components/list-item/list-item.component'
import { MatCardModule } from '@angular/material/card'
import { MatMenuModule } from '@angular/material/menu'
import { ListAlertComponent } from './components/list-alert/list-alert.component'
import { ProjectCardComponent } from './components/project-card/project-card.component'
import { MatSelectModule } from '@angular/material/select'
import { CreateProjectFormComponent } from './containers/create-project-form/create-project-form.component'
import { EditProjectFormComponent } from './containers/edit-project-form/edit-project-form.component'

@NgModule({
  declarations: [
    HomeComponent,
    AdminsComponent,
    DonorsComponent,
    ProjectsComponent,
    NewsComponent,
    DonationsComponent,
    NewAdminComponent,
    ListHeaderComponent,
    ListItemComponent,
    ListAlertComponent,
    ProjectCardComponent,
    CreateProjectFormComponent,
    EditProjectFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatTooltipModule,
    MatMenuModule,
    MatSelectModule,
  ],
})
export class AdminModule {}
