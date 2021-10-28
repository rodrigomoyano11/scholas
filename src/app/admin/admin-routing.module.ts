import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotFoundComponent } from '../shared/containers/not-found/not-found.component'
import { AdminsComponent } from './containers/admins/admins.component'
import { CreateProjectFormComponent } from './containers/create-project-form/create-project-form.component'
import { UpdateProjectFormComponent } from './containers/update-project-form/update-project-form.component'
import { HomeComponent } from './containers/home/home.component'
import { CreateAdminComponent } from './containers/create-admin/create-admin.component'
import { ProjectsComponent } from './containers/projects/projects.component'
import { MetricsProjectListComponent } from './containers/metrics-project-list/metrics-project-list.component'
import { ProjectMetricsComponent } from './containers/project-metrics/project-metrics.component'
import { ChartsComponent } from './containers/charts/charts.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'admins', component: AdminsComponent },
      { path: 'admins/create', component: CreateAdminComponent },

      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/create', component: CreateProjectFormComponent },
      { path: 'projects/update/:id', component: UpdateProjectFormComponent },

      { path: 'metrics', component: MetricsProjectListComponent },
      { path: 'metrics/overview/:id', component: ProjectMetricsComponent },
      { path: 'metrics/charts/:id', component: ChartsComponent },

      { path: '**', component: NotFoundComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
