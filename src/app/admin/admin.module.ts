import { AdminRoutingModule } from './admin-routing.module'
import { AdminsComponent } from './containers/admins/admins.component'
import { ChartsComponent } from './containers/charts/charts.component'
import { CommonModule } from '@angular/common'
import { CreateAdminComponent } from './containers/create-admin/create-admin.component'
import { CreateProjectFormComponent } from './containers/create-project-form/create-project-form.component'
import { FiltersComponent } from './components/filters/filters.component'
import { HomeComponent } from './containers/home/home.component'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatRippleModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { MatTableModule } from '@angular/material/table'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MetricsListComponent } from './components/metrics-list/metrics-list.component'
import { MetricsNumbersComponent } from './components/metrics-numbers/metrics-numbers.component'
import { MetricsProjectListComponent } from './containers/metrics-project-list/metrics-project-list.component'
import { NgModule } from '@angular/core'
import { ProjectMetricsComponent } from './containers/project-metrics/project-metrics.component'
import { ProjectsComponent } from './containers/projects/projects.component'
import { ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '../shared/shared.module'
import { UpdateProjectFormComponent } from './containers/update-project-form/update-project-form.component'

@NgModule({
  declarations: [
    AdminsComponent,
    ChartsComponent,
    CreateAdminComponent,
    CreateProjectFormComponent,
    FiltersComponent,
    HomeComponent,
    MetricsListComponent,
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
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AdminModule {}
