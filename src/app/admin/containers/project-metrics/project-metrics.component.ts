import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { lastValueFrom } from 'rxjs'
import { ToolbarButtons } from 'src/app/shared/components/toolbar/toolbar.component'
import { CreateProjectResponse } from 'src/app/shared/models/api.interface'
import { LayoutService } from 'src/app/shared/services/layout/layout.service'
import { LocationService } from 'src/app/shared/services/location/location.service'
import { ProjectsService } from 'src/app/shared/services/projects/projects.service'
import { FiltersFormData } from '../../components/filters/filters.component'

export interface FiltersData {
  province: number | null
  age1: string | null
  age2: string | null
  amount1: string | null
  amount2: string | null
  paymentType: boolean
}

export interface OrdersData {
  type:
    | 'orderAlphabetically'
    | 'orderRecentOrAncient'
    | 'orderByDonationCount'
    | 'orderByDonationAmount'
  value: 'ascending' | 'descending'
}

@Component({
  selector: 'app-project-metrics',
  templateUrl: './project-metrics.component.html',
  styleUrls: ['./project-metrics.component.css'],
})
export class ProjectMetricsComponent implements OnInit {
  backButtonAction = (): void => void this.router.navigate(['/admin/metrics'])

  tableActions: ToolbarButtons = [
    {
      style: 'quaternary',
      data: [
        {
          label: 'Filtrar',
          icon: 'filter_list',
          action: {
            type: 'overlay',
            click: (): void => console.log('Works'),
          },
        },
        {
          label: 'Ordenar',
          icon: 'sort',
          action: {
            type: 'menu',
            click: (): void => console.log('Works'),
          },
        },
        {
          label: 'Descargar',
          icon: 'file_download',
          action: {
            type: 'button',
            click: (): void => console.log('Works'),
          },
        },
      ],
    },
  ]

  filtersData!: FiltersData
  ordersData!: OrdersData

  selectedProjectId: string | null = this.route.snapshot.paramMap.get('id')
  projectData!: CreateProjectResponse

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projects: ProjectsService,
    public layout: LayoutService,
    private location: LocationService,
  ) {}

  async ngOnInit(): Promise<void> {
    if (!!this.selectedProjectId) {
      this.projectData = await lastValueFrom(
        this.projects.getProject(Number(this.selectedProjectId)),
      )
    }
  }

  goToCharts(): void {
    void this.router.navigate(['admin/metrics/charts', this.selectedProjectId])
  }

  async setFilters(data: FiltersFormData): Promise<void> {
    const { province } = data

    this.filtersData = {
      ...data,
      province: province ? await this.location.getIdByProvince(province) : null,
    }
  }

  setOrder(type: OrdersData['type'], value: OrdersData['value']): void {
    this.ordersData = {
      type,
      value,
    }
  }
}
