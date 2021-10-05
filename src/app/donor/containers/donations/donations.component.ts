import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { DonationsService } from 'src/app/donation/services/donations/donations.service'
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

  constructor(private router: Router, public donations: DonationsService) {}

  goToDonationDetails(id: Donation['id']): void {
    void this.router.navigate(['/donation/certificate', id])
  }
}
