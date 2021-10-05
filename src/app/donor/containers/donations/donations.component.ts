import { Component } from '@angular/core'
import { Router } from '@angular/router'
import {
  DonationsService,
  DonationTest,
} from 'src/app/donation/services/donations/donations.service'
import { BadgeStatus } from 'src/app/shared/components/list-item/list-item.component'
import { ToolbarButtons } from 'src/app/shared/components/toolbar/toolbar.component'
import { Donation } from 'src/app/shared/models/donation.interface'

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css'],
})
export class DonationsComponent {
  toolbarButtons: ToolbarButtons = [
    {
      style: 'secondary',
      data: [
        {
          label: 'Donar a un proyecto',
          icon: 'add',
          action: {
            type: 'button',
            click: (): void => void this.router.navigate(['/admin/edit-project']),
          },
        },
      ],
    },
  ]

  backButtonAction = (): void => void this.router.navigate(['/auth/account'])

  donations!: DonationTest[]

  constructor(private router: Router, public donationsService: DonationsService) {
    this.donations = donationsService.getDonations()
  }

  goToDonationDetails(id: Donation['id']): void {
    void this.router.navigate(['/donation/certificate', id])
  }

  setListItemStatus(status: Donation['status']): BadgeStatus | null {
    const statuses: { [key in Donation['status']]: BadgeStatus | null } = {
      success: null,
      pending: {
        type: 'warn',
        label: 'Pendiente',
      },
      failure: {
        type: 'error',
        label: 'Rechazado',
      },
    }

    return statuses[status]
  }
}
