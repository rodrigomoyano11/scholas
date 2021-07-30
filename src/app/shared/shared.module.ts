import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedRoutingModule } from './shared-routing.module'
import { LayoutComponent } from './containers/layout/layout.component'
import { NotFoundComponent } from './containers/not-found/not-found.component'
import { HeaderComponent } from './components/header/header.component'

@NgModule({
  declarations: [NotFoundComponent, LayoutComponent, HeaderComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [NotFoundComponent, LayoutComponent]
})
export class SharedModule {}
