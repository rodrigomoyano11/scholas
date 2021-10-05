import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ToolbarButtons } from 'src/app/shared/components/toolbar/toolbar.component'
import { Donation } from 'src/app/shared/models/donation.interface'
import { ShareService } from 'src/app/shared/services/share/share.service'
import { DonationsService, DonationTest } from '../../services/donations/donations.service'

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
})
export class CertificateComponent {
  selectedDonationId: string | null = this.route.snapshot.paramMap.get('id')

  toolbarButtons: ToolbarButtons = [
    {
      style: 'tertiary',
      data: [
        {
          label: 'Volver',
          icon: 'chevron_left',
          action: {
            type: 'button',
            click: (): void => void this.router.navigate(['/donor/donations']),
          },
        },
      ],
    },
    {
      style: 'tertiary',
      data: [
        {
          label: 'Compartir',
          icon: 'share',
          action: {
            type: 'button',
            click: (): void =>
              this.selectedDonationId ? this.shareAsLink(this.selectedDonationId) : undefined,
          },
        },
      ],
    },
  ]

  donation!: DonationTest | null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private share: ShareService,
    public donationsService: DonationsService,
  ) {
    this.donation = this.selectedDonationId
      ? donationsService.getDonation(this.selectedDonationId)
      : null
  }

  shareAsLink(donationId: Donation['id']): void {
    this.share.shareAsLink(
      `${window.location.href}/${donationId}`,
      'Se copió el link de la donación',
    )
  }
}
