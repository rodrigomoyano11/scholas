import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AdminRoutingModule } from './admin-routing.module'
import { HomeComponent } from './containers/home/home.component'
import { AdminsComponent } from './containers/admins/admins.component'
import { ProjectsComponent } from './containers/projects/projects.component'
import { SharedModule } from '../shared/shared.module'
import { CreateAdminComponent } from './containers/create-admin/create-admin.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatCardModule } from '@angular/material/card'
import { MatMenuModule } from '@angular/material/menu'
import { MatSelectModule } from '@angular/material/select'
import { CreateProjectFormComponent } from './containers/create-project-form/create-project-form.component'
import { UpdateProjectFormComponent } from './containers/update-project-form/update-project-form.component'
import { MetricsProjectListComponent } from './containers/metrics-project-list/metrics-project-list.component'
import { ProjectMetricsComponent } from './containers/project-metrics/project-metrics.component'
import { ChartsComponent } from './containers/charts/charts.component'

@NgModule({
  declarations: [
    HomeComponent,
    AdminsComponent,
    ProjectsComponent,
    CreateAdminComponent,
    CreateProjectFormComponent,
    UpdateProjectFormComponent,
    MetricsProjectListComponent,
    ProjectMetricsComponent,
    ChartsComponent,
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
