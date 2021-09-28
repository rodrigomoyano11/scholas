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
import { AmountProgressComponent } from './components/amount-progress/amount-progress.component'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component'
import { IvyCarouselModule } from 'angular-responsive-carousel'
import { VideoPlayerComponent } from './components/video-player/video-player.component'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { MatTooltipModule } from '@angular/material/tooltip'
import { ProjectCardComponent } from './components/project-card/project-card.component'
import { MatCardModule } from '@angular/material/card'
import { ListItemComponent } from './components/list-item/list-item.component'
import { ListAlertComponent } from './components/list-alert/list-alert.component'
import { MatListModule } from '@angular/material/list'
import { ProjectDetailsComponent } from './containers/project-details/project-details.component'

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
    AmountProgressComponent,
    ImageGalleryComponent,
    VideoPlayerComponent,
    ToolbarComponent,
    ProjectCardComponent,
    ListItemComponent,
    ListAlertComponent,
    ProjectDetailsComponent,
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
    MatListModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressBarModule,
    LayoutModule,
    IvyCarouselModule,
  ],
  exports: [
    NotFoundComponent,
    LayoutComponent,
    ModalContainerComponent,
    UploadImageComponent,
    AmountProgressComponent,
    VideoPlayerComponent,
    ImageGalleryComponent,
    ToolbarComponent,
    ProjectCardComponent,
    ListItemComponent,
    ListAlertComponent,
    ProjectDetailsComponent,
  ],
})
export class SharedModule {}
