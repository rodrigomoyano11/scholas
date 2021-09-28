import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DonationRoutingModule } from './donation-routing.module'
import { HomeComponent } from './containers/home/home.component'
import { SharedModule } from '../shared/shared.module'
import { NewDonationComponent } from './containers/new-donation/new-donation.component'

@NgModule({
  declarations: [HomeComponent, NewDonationComponent],
  imports: [CommonModule, DonationRoutingModule, SharedModule],
})
export class DonationModule {}
