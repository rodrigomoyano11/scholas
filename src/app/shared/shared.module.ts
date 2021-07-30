import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedRoutingModule } from './shared-routing.module'
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { LayoutComponent } from './containers/layout/layout.component'

@NgModule({
  declarations: [NotFoundComponent, LayoutComponent],
  imports: [CommonModule, SharedRoutingModule]
})
export class SharedModule {}
