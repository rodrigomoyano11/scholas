import { animate, state, style, transition, trigger } from '@angular/animations'
import { Component, Input, OnChanges, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { DonationsService } from 'src/app/donation/services/donations/donations.service'
import { GetDonorsByFiltersResponse } from 'src/app/core/models/api.interface'
import { DonationWithProjectName } from '../../../donation/services/donations/donations.service'
import { FiltersData, OrdersData } from '../../containers/project-metrics/project-metrics.component'
import { GetMetricsByFiltersArgs, MetricsService } from '../../services/metrics/metrics.service'

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

interface PaginatorEvent {
  pageIndex: number
  pageSize: number
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
export class MetricsListComponent implements OnInit, OnChanges {
  // Inputs
  @Input() filtersData!: FiltersData
  @Input() ordersData!: OrdersData

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
  dataSource!: DonorData[]
  metricsData!: GetDonorsByFiltersResponse['body'] // Data from service
  selectedProjectId: string | null = this.route.snapshot.paramMap.get('id')

  // States
  expandedElement: DonorData | null = null

  // Paginator
  currentPage = 0
  itemsPerPage = 30
  totalPages = 0

  constructor(
    private donations: DonationsService,
    private metrics: MetricsService,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getDonorsData()
    this.convertDonorsData()
  }

  async ngOnChanges(): Promise<void> {
    await this.getDonorsData()
    this.convertDonorsData()
  }

  async getDonorsData(): Promise<void> {
    const projectId = Number(this.selectedProjectId)

    const selectedOrder: GetMetricsByFiltersArgs = this.ordersData
      ? Object.fromEntries([[this.ordersData.type, this.ordersData.value]])
      : {
          orderAlphabetically: 'ascending',
        }

    if (!this.filtersData) {
      this.metricsData = await this.metrics.getDonorsByFilters({
        ...selectedOrder,
        projectId,
        page: this.currentPage,
        size: this.itemsPerPage,
      })

      return
    }

    const { province, age1, age2, amount1, amount2, paymentType: isRecurring } = this.filtersData

    const filtersAndOrdersData: GetMetricsByFiltersArgs = {
      // General
      projectId,

      page: this.currentPage,
      size: this.itemsPerPage,

      // Filters
      provinceId: province ?? undefined,

      age1: Number(age1) ?? undefined,
      age2: Number(age2) ?? undefined,

      mount1: Number(amount1) ?? undefined,
      mount2: Number(amount2) ?? undefined,

      type: isRecurring ? 'recurring' : 'regular',

      // Orders
      ...selectedOrder,
    }

    this.metricsData = await this.metrics.getDonorsByFilters(filtersAndOrdersData)
    this.totalPages = this.metricsData.totalItems
  }

  convertDonorsData(): void {
    if (!this.metricsData) return

    const { data: donors } = this.metricsData

    this.dataSource = donors.map(
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

  // Change page event
  async changePage({ pageIndex, pageSize }: PaginatorEvent): Promise<void> {
    this.currentPage = pageIndex
    this.itemsPerPage = pageSize

    await this.getDonorsData()
    this.convertDonorsData()
  }

  async selectStateOfExpandedElement(element: DonorData): Promise<void> {
    this.expandedElement = this.expandedElement === element ? null : element

    this.dataSource = await Promise.all(
      this.dataSource.map(async (data) => {
        if (data === this.expandedElement) {
          const donationsByUser = await this.donations.getDonationsByUserAndProject(
            data.id,
            Number(this.selectedProjectId),
          )

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
