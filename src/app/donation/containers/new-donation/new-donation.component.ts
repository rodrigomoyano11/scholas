import { Component } from '@angular/core'
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper'
import { LayoutService } from 'src/app/shared/services/layout/layout.service'
import { Donation } from 'src/app/shared/models/donation.interface'
import { DonationsService, MercadoPagoResponse } from '../../services/donations/donations.service'
import { ActivatedRoute, Router } from '@angular/router'
import { MatStepper } from '@angular/material/stepper'
import { MatSnackBar } from '@angular/material/snack-bar'
import { lastValueFrom, take } from 'rxjs'

@Component({
  selector: 'app-new-donation',
  templateUrl: './new-donation.component.html',
  styleUrls: ['./new-donation.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class NewDonationComponent {
  // Project Data
  selectedProjectId: string | null = this.route.snapshot.paramMap.get('id')

  // Stepper Data
  selectedIndex = 0
  stepperStatus = [false, false, false]
  state!: 'failure' | 'pending' | 'success' | 'recurring'

  // Donation Data
  amount!: Donation['amount']
  type!: Donation['type']

  constructor(
    public layout: LayoutService,
    private donations: DonationsService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    if (window.location.href.includes('completed')) void this.goToCompletedPage()
  }

  setStepperStatus(stepIndex: number, value: boolean): void {
    this.stepperStatus[stepIndex] = value
  }

  goNext(stepper: MatStepper, stepIndex: number) {
    this.stepperStatus[stepIndex] = true
    stepper.next()
    this.setStepperStatus(2, true)
  }

  async handleAmountSelectionComplete(): Promise<void> {
    const donationData = {
      donation: this.amount,
      type: this.type,
      projectId: Number(this.selectedProjectId),
    }

    if (this.type === 'recurring') {
      this.state = 'recurring'

      this.setStepperStatus(1, true)

      return
    }

    const createDonationResponse = await this.donations.createDonation(donationData)

    this.setStepperStatus(1, true)
    document.location.href = createDonationResponse
  }

  async goToCompletedPage(): Promise<void> {
    this.setStepperStatus(0, true)
    this.setStepperStatus(1, true)
    this.selectedIndex = 2

    const MercadoPagoData = (await lastValueFrom(
      this.route.queryParams.pipe(take(1)),
    )) as unknown as MercadoPagoResponse

    await this.donations.editDonation(MercadoPagoData.payment_id, MercadoPagoData.preference_id)

    if (MercadoPagoData.payment_id === null) {
      this.state = 'failure'
      return
    }

    this.state = this.donations.setDonationStatus(MercadoPagoData.status)
  }

  finalizeDonation(status: 'success' | 'failure'): void {
    if (status === 'success') {
      void this.router.navigate(['/donor/donations'])
      return
    }

    void this.router.navigate(['donor/projects']).then(() =>
      this.snackBar.open('Selecciona nuevamente el proyecto al que deseas donar', 'Cerrar', {
        duration: 5000,
      }),
    )
  }
}
