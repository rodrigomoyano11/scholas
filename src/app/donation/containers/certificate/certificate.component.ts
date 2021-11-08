import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute, Router } from '@angular/router'
import { lastValueFrom } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth/auth.service'
import { DialogComponent, DialogData } from 'src/app/shared/components/dialog/dialog.component'
import { ToolbarButtons } from 'src/app/shared/components/toolbar/toolbar.component'
import {
  DonationsService,
  DonationWithProjectName,
} from '../../services/donations/donations.service'

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
})
export class CertificateComponent implements OnInit {
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
            click: (): void => (this.selectedDonationId ? this.shareAsLink() : undefined),
          },
        },
      ],
    },
  ]

  donation: DonationWithProjectName | undefined = undefined

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private donationsService: DonationsService,
    public auth: AuthService,
  ) {}
  async ngOnInit(): Promise<void> {
    this.donation = await this.donationsService.getDonationById(Number(this.selectedDonationId))

    if (this.donation?.status === 'SUCCESS') this.toolbarButtons.pop()
  }

  shareAsLink(): void {
    void lastValueFrom(
      this.dialog
        .open<DialogComponent, DialogData>(DialogComponent, {
          data: {
            actions: [null, 'Cerrar'],
            title: 'Importante',
            description: 'Para compartir tu certificado deberías hacer una captura de pantalla',
            icon: 'info',
          },
        })
        .afterClosed(),
    )
  }
}
