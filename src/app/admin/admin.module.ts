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
import { MetricsNumbersComponent } from './components/metrics-numbers/metrics-numbers.component'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MetricsListComponent } from './components/metrics-list/metrics-list.component'
import { MetricsListItemComponent } from './components/metrics-list-item/metrics-list-item.component'

@NgModule({
  declarations: [
    AdminsComponent,
    ChartsComponent,
    CreateAdminComponent,
    CreateProjectFormComponent,
    HomeComponent,
    MetricsListComponent,
    MetricsListItemComponent,
    MetricsNumbersComponent,
    MetricsProjectListComponent,
    ProjectMetricsComponent,
    ProjectsComponent,
    UpdateProjectFormComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AdminModule {}
