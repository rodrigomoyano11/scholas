import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DonationRoutingModule } from './donation-routing.module'
import { HomeComponent } from './containers/home/home.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, DonationRoutingModule, SharedModule],
})
export class DonationModule {}
