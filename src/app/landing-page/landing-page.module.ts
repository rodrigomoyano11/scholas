import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LandingPageRoutingModule } from './landing-page-routing.module'
import { HomeComponent } from './containers/home/home.component'
import { ProjectsComponent } from './containers/projects/projects.component'
import { NewsComponent } from './containers/news/news.component'

@NgModule({
  declarations: [HomeComponent, ProjectsComponent, NewsComponent],
  imports: [CommonModule, LandingPageRoutingModule]
})
export class LandingPageModule {}
