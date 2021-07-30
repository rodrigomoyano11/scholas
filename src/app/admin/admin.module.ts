import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AdminRoutingModule } from './admin-routing.module'
import { HomeComponent } from './containers/home/home.component'
import { AdminsComponent } from './containers/admins/admins.component'
import { DonorsComponent } from './containers/donors/donors.component'

@NgModule({
  declarations: [HomeComponent, AdminsComponent, DonorsComponent],
  imports: [CommonModule, AdminRoutingModule]
})
export class AdminModule {}
