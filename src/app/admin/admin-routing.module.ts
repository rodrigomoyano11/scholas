import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotFoundComponent } from '../shared/containers/not-found/not-found.component'
import { AdminsComponent } from './containers/admins/admins.component'
import { CreateProjectFormComponent } from './containers/create-project-form/create-project-form.component'
import { UpdateProjectFormComponent } from './containers/update-project-form/update-project-form.component'
import { HomeComponent } from './containers/home/home.component'
import { CreateAdminComponent } from './containers/create-admin/create-admin.component'
import { ProjectDetailsComponent } from '../shared/containers/project-details/project-details.component'
import { ProjectsComponent } from './containers/projects/projects.component'
import { MetricsComponent } from './containers/metrics/metrics.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'admins', component: AdminsComponent },
      { path: 'admins/create', component: CreateAdminComponent },

      { path: 'metrics', component: MetricsComponent },

      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/create', component: CreateProjectFormComponent },
      { path: 'projects/read/:id', component: ProjectDetailsComponent },
      { path: 'projects/update/:id', component: UpdateProjectFormComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

/* 

{ path: 'projects', component: ProjectsComponent },




*/
