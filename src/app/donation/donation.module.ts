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
import { DonationPaymentStepComponent } from './components/donation-payment-step/donation-payment-step.component'
import { DonationCompletionStepComponent } from './components/donation-completion-step/donation-completion-step.component'

@NgModule({
  declarations: [
    HomeComponent,
    NewDonationComponent,
    AmountSelectionStepComponent,
    DonationPaymentStepComponent,
    DonationCompletionStepComponent,
  ],
  imports: [
    CommonModule,
    DonationRoutingModule,
    SharedModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatStepperModule,
    MatListModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class DonationModule {}
