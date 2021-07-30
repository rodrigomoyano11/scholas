import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LandingPageRoutingModule } from './landing-page-routing.module'
import { HomeComponent } from './containers/home/home.component'

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, LandingPageRoutingModule]
})
export class LandingPageModule {}
