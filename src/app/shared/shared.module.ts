import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedRoutingModule } from './shared-routing.module'
import { LayoutComponent } from './containers/layout/layout.component'
import { NotFoundComponent } from './containers/not-found/not-found.component'

@NgModule({
  declarations: [NotFoundComponent, LayoutComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [NotFoundComponent, LayoutComponent]
})
export class SharedModule {}
