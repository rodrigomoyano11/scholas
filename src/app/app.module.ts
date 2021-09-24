import { LOCALE_ID, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { environment } from 'src/environments/environment'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { HttpClientModule } from '@angular/common/http'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { MatDialogModule } from '@angular/material/dialog'
import AR from '@angular/common/locales/es-AR'
import { registerLocaleData } from '@angular/common'
import { ClipboardModule } from '@angular/cdk/clipboard'

registerLocaleData(AR)

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ClipboardModule,
    MatDialogModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
