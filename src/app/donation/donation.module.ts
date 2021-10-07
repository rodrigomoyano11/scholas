import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatStepperModule } from '@angular/material/stepper'
import { DonationRoutingModule } from './donation-routing.module'
import { HomeComponent } from './containers/home/home.component'
import { SharedModule } from '../shared/shared.module'
import { NewDonationComponent } from './containers/new-donation/new-donation.component'
import { MatMenuModule } from '@angular/material/menu'
import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'
import { MatListModule } from '@angular/material/list'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { AmountSelectionStepComponent } from './components/amount-selection-step/amount-selection-step.component'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { CertificateComponent } from './containers/certificate/certificate.component'
import { PaymentComponent } from './components/payment/payment.component'
import { SuccessPaymentComponent } from './components/success-payment/success-payment.component'
import { FailurePaymentComponent } from './components/failure-payment/failure-payment.component'
import { PendingPaymentComponent } from './components/pending-payment/pending-payment.component'
import { DonationAmountsSettingsComponent } from './containers/donation-amounts-settings/donation-amounts-settings.component'

@NgModule({
  declarations: [
    HomeComponent,
    NewDonationComponent,
    AmountSelectionStepComponent,
    CertificateComponent,
    PaymentComponent,
    SuccessPaymentComponent,
    FailurePaymentComponent,
    PendingPaymentComponent,
    DonationAmountsSettingsComponent,
  ],
  imports: [
    CommonModule,
    DonationRoutingModule,
    SharedModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatDialogModule,
    MatStepperModule,
    MatListModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class DonationModule {}
