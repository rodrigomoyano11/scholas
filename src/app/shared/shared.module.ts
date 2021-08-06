import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedRoutingModule } from './shared-routing.module'
import { LayoutComponent } from './containers/layout/layout.component'
import { NotFoundComponent } from './containers/not-found/not-found.component'
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatMenuModule } from '@angular/material/menu'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [NotFoundComponent, LayoutComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [NotFoundComponent, LayoutComponent]
})
export class SharedModule {}
