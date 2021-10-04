import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotFoundComponent } from '../shared/containers/not-found/not-found.component'
import { DonationsComponent } from './containers/donations/donations.component'
import { HomeComponent } from './containers/home/home.component'
import { NewsComponent } from './containers/news/news.component'
import { ProjectsComponent } from './containers/projects/projects.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'news', component: NewsComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'donations', component: DonationsComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonorRoutingModule {}
