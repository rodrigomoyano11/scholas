import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { ClipboardModule } from '@angular/cdk/clipboard'
import { environment } from 'src/environments/environment'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { LOCALE_ID, NgModule } from '@angular/core'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { registerLocaleData } from '@angular/common'
import AR from '@angular/common/locales/es-AR'
import { IsLoggedGuard } from './core/guards/isLogged/is-logged.guard'
import { CoreModule } from './core/core.module'

import { InterceptorService } from './core/utils/interceptor.service'

registerLocaleData(AR)

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ClipboardModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    CoreModule,
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-AR' },
    IsLoggedGuard,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
