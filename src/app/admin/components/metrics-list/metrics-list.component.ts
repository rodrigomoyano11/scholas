import { animate, state, style, transition, trigger } from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { DonationsService } from 'src/app/donation/services/donations/donations.service'
import { GetDonorsByProjectResponse } from 'src/app/shared/models/api.interface'
import { DonationWithProjectName } from '../../../donation/services/donations/donations.service'
import { MetricsService } from '../../services/metrics/metrics.service'

interface DonorData {
  id: number
  fullName: string
  province: string
  locality: string
  email: string
  photo: string | null
  number: string
  donationsQuantity: number
  totalAmount: number
  donations?: DonationWithProjectName[]
}

@Component({
  selector: 'app-metrics-list',
  templateUrl: './metrics-list.component.html',
  styleUrls: ['./metrics-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MetricsListComponent implements OnInit {
  // General settings
  columnNames = {
    fullName: 'Donante',
    donationsQuantity: 'Cantidad de Donaciones',
    totalAmount: 'Importe donado',
    action: ' ',
  }
  columnsToDisplay: ['fullName', 'donationsQuantity', 'totalAmount', 'action'] = [
    'fullName',
    'donationsQuantity',
    'totalAmount',
    'action',
  ]

  // Data
  donorsData!: DonorData[]
  metricsData!: GetDonorsByProjectResponse['body']
  selectedProjectId: string | null = this.route.snapshot.paramMap.get('id')

  // States
  expandedElement: DonorData | null = null
  constructor(
    private donations: DonationsService,
    private metrics: MetricsService,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit(): Promise<void> {
    this.metricsData = await this.metrics.getDonorsByProject(Number(this.selectedProjectId))

    this.getDonorsData()
  }

  getDonorsData(): void {
    if (!this.metricsData) return

    const { data: donors } = this.metricsData

    this.donorsData = donors.map(
      ({ donationCount: donationsQuantity, amount: totalAmount, user }) => {
        const {
          id,
          displayName: fullName,
          province,
          locality,
          email,
          phoneNumber: number,
          photoURL: photo,
        } = user

        return {
          id,
          fullName,
          province: province.name,
          locality,
          email,
          number,
          photo,
          donationsQuantity,
          totalAmount,
        }
      },
    )
  }

  async selectStateOfExpandedElement(element: DonorData): Promise<void> {
    this.expandedElement = this.expandedElement === element ? null : element

    this.donorsData = await Promise.all(
      this.donorsData.map(async (data) => {
        if (data === this.expandedElement) {
          const donationsByUser = await this.donations.getDonationsByUserId(data.id)

          const modifiedData = {
            ...data,
            donations: donationsByUser,
          }

          this.expandedElement = modifiedData

          return modifiedData
        }

        return data
      }),
    )
  }
}
