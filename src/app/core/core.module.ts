import { AlertMessageComponent } from './components/alert-message/alert-message.component'
import { AmountProgressComponent } from './components/amount-progress/amount-progress.component'
import { BadgeComponent } from './components/badge/badge.component'
import { CommonModule } from '@angular/common'
import { DialogComponent } from './components/dialog/dialog.component'
import { FooterComponent } from './components/footer/footer.component'
import { HeaderComponent } from './components/header/header.component'
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component'
import { IvyCarouselModule } from 'angular-responsive-carousel'
import { LayoutComponent } from './containers/layout/layout.component'
import { LayoutModule } from '@angular/cdk/layout'
import { ListAlertComponent } from './components/list-alert/list-alert.component'
import { ListItemComponent } from './components/list-item/list-item.component'
import { LogoComponent } from './components/logo/logo.component'
import { MainMenuComponent } from './components/main-menu/main-menu.component'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatRippleModule } from '@angular/material/core'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { ModalContainerComponent } from './components/modal-container/modal-container.component'
import { NgModule } from '@angular/core'
import { NotFoundComponent } from './containers/not-found/not-found.component'
import { OverlayModule } from '@angular/cdk/overlay'
import { ProjectCardComponent } from './components/project-card/project-card.component'
import { ProjectDetailsComponent } from './containers/project-details/project-details.component'
import { CoreRoutingModule } from './core-routing.module'
import { ShortNumberPipe } from './pipes/short-number.pipe'
import { SpinnerComponent } from './components/spinner/spinner.component'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { UploadImageComponent } from './components/upload-image/upload-image.component'
import { UserProfileMenuComponent } from './components/user-profile-menu/user-profile-menu.component'
import { VideoPlayerComponent } from './components/video-player/video-player.component'

@NgModule({
  declarations: [
    AlertMessageComponent,
    AmountProgressComponent,
    BadgeComponent,
    DialogComponent,
    FooterComponent,
    HeaderComponent,
    ImageGalleryComponent,
    LayoutComponent,
    ListAlertComponent,
    ListItemComponent,
    LogoComponent,
    MainMenuComponent,
    ModalContainerComponent,
    NotFoundComponent,
    ProjectCardComponent,
    ProjectDetailsComponent,
    ShortNumberPipe,
    SpinnerComponent,
    ToolbarComponent,
    UploadImageComponent,
    UserProfileMenuComponent,
    VideoPlayerComponent,
  ],
  imports: [
    CommonModule,
    IvyCarouselModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatToolbarModule,
    MatTooltipModule,
    OverlayModule,
    CoreRoutingModule,
  ],
  exports: [
    AlertMessageComponent,
    AmountProgressComponent,
    BadgeComponent,
    ImageGalleryComponent,
    LayoutComponent,
    ListAlertComponent,
    ListItemComponent,
    LogoComponent,
    ModalContainerComponent,
    NotFoundComponent,
    ProjectCardComponent,
    ProjectDetailsComponent,
    ShortNumberPipe,
    SpinnerComponent,
    ToolbarComponent,
    UploadImageComponent,
    VideoPlayerComponent,
  ],
})
export class CoreModule {}
