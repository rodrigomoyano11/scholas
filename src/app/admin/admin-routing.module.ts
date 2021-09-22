import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotFoundComponent } from '../shared/containers/not-found/not-found.component'
import { AdminsComponent } from './containers/admins/admins.component'
import { CreateProjectFormComponent } from './containers/create-project-form/create-project-form.component'
import { DonationsComponent } from './containers/donations/donations.component'
import { DonorsComponent } from './containers/donors/donors.component'
import { EditProjectFormComponent } from './containers/edit-project-form/edit-project-form.component'
import { HomeComponent } from './containers/home/home.component'
import { NewAdminComponent } from './containers/new-admin/new-admin.component'
import { NewsComponent } from './containers/news/news.component'

import { ProjectsComponent } from './containers/projects/projects.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'admins', component: AdminsComponent },
      { path: 'new-admin', component: NewAdminComponent },
      { path: 'donors', component: DonorsComponent },
      { path: 'donations', component: DonationsComponent },
      { path: 'news', component: NewsComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'new-project', component: CreateProjectFormComponent },
      { path: 'edit-project/:id', component: EditProjectFormComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
