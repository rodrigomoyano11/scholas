import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import {
  DonationsService,
  DonationWithProjectName,
} from 'src/app/donation/services/donations/donations.service'
import { BadgeStatus } from 'src/app/shared/components/list-item/list-item.component'
import { ToolbarButtons } from 'src/app/shared/components/toolbar/toolbar.component'
import { GetDonationsByUserResponse } from 'src/app/shared/models/api.interface'

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css'],
})
export class DonationsComponent implements OnInit {
  toolbarButtons: ToolbarButtons = [
    {
      style: 'secondary',
      data: [
        {
          label: 'Donar a un proyecto',
          icon: 'add',
          action: {
            type: 'button',
            click: (): void => void this.router.navigate(['/donor/projects']),
          },
        },
      ],
    },
  ]

  backButtonAction = (): void => void this.router.navigate(['/auth/account'])

  isLoading = false

  donations: DonationWithProjectName[] = []
  projectNames: {
    id: number
    name: string
  }[] = []

  constructor(
    private router: Router,
    public donationsService: DonationsService,
    private snackBar: MatSnackBar,
  ) {}
  async ngOnInit(): Promise<void> {
    const userId = this.donationsService.getUserId()

    this.isLoading = true
    this.donations = await this.donationsService.getDonationsByUserId(userId)
    this.isLoading = false
  }

  goToDonationDetails(id: number, status: GetDonationsByUserResponse[0]['status']): void {
    if (status === 'SUCCESS') void this.router.navigate(['/donation/certificate', id])

    this.snackBar.open(
      `El certificado no está disponible porque la donación ${
        status === 'PENDING' ? 'todavía está pendiente' : 'fue rechazada'
      }`,
      'Cerrar',
      {
        duration: 5000,
      },
    )
  }

  setListItemStatus(status: 'SUCCESS' | 'PENDING' | 'FAILURE' | null): BadgeStatus | null {
    const statuses: { [key in 'SUCCESS' | 'PENDING' | 'FAILURE']: BadgeStatus | null } = {
      SUCCESS: null,
      PENDING: {
        type: 'warn',
        label: 'Pendiente',
      },
      FAILURE: {
        type: 'error',
        label: 'Rechazado',
      },
    }

    return status ? statuses[status] : statuses.FAILURE
  }
}
