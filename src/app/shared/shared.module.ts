import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedRoutingModule } from './shared-routing.module'
import { LayoutComponent } from './containers/layout/layout.component'
import { NotFoundComponent } from './containers/not-found/not-found.component'
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatMenuModule } from '@angular/material/menu'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { LogoComponent } from './components/logo/logo.component'
import { LayoutModule } from '@angular/cdk/layout'
import { UserProfileMenuComponent } from './components/user-profile-menu/user-profile-menu.component'
import { MainMenuComponent } from './components/main-menu/main-menu.component'
import { ModalContainerComponent } from './components/modal-container/modal-container.component'
import { DialogComponent } from './components/dialog/dialog.component'
import { UploadImageComponent } from './components/upload-image/upload-image.component'

@NgModule({
  declarations: [
    NotFoundComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    UserProfileMenuComponent,
    MainMenuComponent,
    ModalContainerComponent,
    DialogComponent,
    UploadImageComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    LayoutModule,
  ],
  exports: [NotFoundComponent, LayoutComponent, ModalContainerComponent, UploadImageComponent],
})
export class SharedModule {}
