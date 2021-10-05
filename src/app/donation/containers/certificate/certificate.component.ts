import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ToolbarButtons } from 'src/app/shared/components/toolbar/toolbar.component'
import { Donation } from 'src/app/shared/models/donation.interface'
import { ShareService } from 'src/app/shared/services/share/share.service'

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
})
export class CertificateComponent {
  selectedProjectId: string | null = this.route.snapshot.paramMap.get('id')

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
              this.selectedProjectId ? this.shareAsLink(this.selectedProjectId) : undefined,
          },
        },
      ],
    },
  ]

  constructor(private route: ActivatedRoute, private router: Router, private share: ShareService) {}

  shareAsLink(donationId: Donation['id']): void {
    this.share.shareAsLink(
      `${window.location.href}/${donationId}`,
      'Se copió el link de la donación',
    )
  }
}
