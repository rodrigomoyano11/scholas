import { AmountSelectionStepComponent } from './components/amount-selection-step/amount-selection-step.component'
import { CertificateComponent } from './containers/certificate/certificate.component'
import { CommonModule } from '@angular/common'
import { DonationAmountsSettingsComponent } from './containers/donation-amounts-settings/donation-amounts-settings.component'
import { DonationRoutingModule } from './donation-routing.module'
import { FailurePaymentComponent } from './components/failure-payment/failure-payment.component'
import { HomeComponent } from './containers/home/home.component'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatStepperModule } from '@angular/material/stepper'
import { MatTooltipModule } from '@angular/material/tooltip'
import { NewDonationComponent } from './containers/new-donation/new-donation.component'
import { NgModule } from '@angular/core'
import { PaymentComponent } from './components/payment/payment.component'
import { PendingPaymentComponent } from './components/pending-payment/pending-payment.component'
import { ReactiveFormsModule } from '@angular/forms'
import { CoreModule } from '../core/core.module'
import { SuccessPaymentComponent } from './components/success-payment/success-payment.component'
import { RecurringPaymentComponent } from './components/recurring-payment/recurring-payment.component'

@NgModule({
  declarations: [
    AmountSelectionStepComponent,
    CertificateComponent,
    DonationAmountsSettingsComponent,
    FailurePaymentComponent,
    HomeComponent,
    NewDonationComponent,
    PaymentComponent,
    PendingPaymentComponent,
    SuccessPaymentComponent,
    RecurringPaymentComponent,
  ],
  imports: [
    CommonModule,
    DonationRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatStepperModule,
    MatTooltipModule,
    ReactiveFormsModule,
    CoreModule,
  ],
})
export class DonationModule {}
