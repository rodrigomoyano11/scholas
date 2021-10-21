import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { ClipboardModule } from '@angular/cdk/clipboard'
import { environment } from 'src/environments/environment'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { HttpClientModule } from '@angular/common/http'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { LOCALE_ID, NgModule } from '@angular/core'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { registerLocaleData } from '@angular/common'
import AR from '@angular/common/locales/es-AR'

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
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
