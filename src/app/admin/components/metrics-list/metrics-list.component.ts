import { animate, state, style, transition, trigger } from '@angular/animations'
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { ActivatedRoute } from '@angular/router'
import { DonationsService } from 'src/app/donation/services/donations/donations.service'
import { GetDonorsByFiltersResponse } from 'src/app/shared/models/api.interface'
import { DonationWithProjectName } from '../../../donation/services/donations/donations.service'
import { FiltersData, OrdersData } from '../../containers/project-metrics/project-metrics.component'
import { GetDonorsByFiltersArgs, MetricsService } from '../../services/metrics/metrics.service'

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
export class MetricsListComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator

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

  currentPage = 0
  itemsPerPage = 3
  totalPages = 0

  filtersAndOrdersData!: {
    projectId: number
    page: number
    size: number
    type: 'recurring' | 'regular'
    provinceId: number | undefined
    age1: number
    age2: number
    mount1: number
    mount2: number
    orderAlphabetically?: 'ascending' | 'descending' | undefined
    orderRecentOrAncient?: 'ascending' | 'descending' | undefined
    orderByDonationCount?: 'ascending' | 'descending' | undefined
  }

  constructor(
    private donations: DonationsService,
    private metrics: MetricsService,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getDonorsData()
    this.convertDonorsData()

    this.totalPages = this.metricsData.totalPage
  }

  async ngOnChanges(): Promise<void> {
    await this.getDonorsData()
    this.convertDonorsData()
  }

  async getDonorsData(): Promise<void> {
    const projectId = Number(this.selectedProjectId)

    const selectedOrder: GetDonorsByFiltersArgs = this.ordersData
      ? Object.fromEntries([[this.ordersData.type, this.ordersData.value]])
      : {
          orderAlphabetically: 'ascending',
        }

    if (!this.filtersData) {
      this.metricsData = await this.metrics.getDonorsByFilters({
        projectId,

        ...selectedOrder,
      })

      return
    }

    const { province, age1, age2, amount1, amount2, paymentType: isRecurring } = this.filtersData

    this.filtersAndOrdersData = {
      // General
      projectId,

      page: 0, // Current Page
      size: 3, // Items per page

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

    this.metricsData = await this.metrics.getDonorsByFilters(this.filtersAndOrdersData)
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

  changePage(event: unknown) {
    const { previousPageIndex, pageIndex, pageSize, length } = event as {
      previousPageIndex: number
      pageIndex: number
      pageSize: number
      length: number
    }

    console.log(event)
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
