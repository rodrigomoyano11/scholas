import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { take } from 'rxjs/operators'
import { DonationsService } from 'src/app/donation/services/donations/donations.service'
import { CreateProjectResponse, GetMetricsResponse } from 'src/app/shared/models/api.interface'
import { ShortNumberPipe } from 'src/app/shared/pipes/short-number.pipe'
import { LayoutService } from 'src/app/shared/services/layout/layout.service'
import { LocationService } from 'src/app/shared/services/location/location.service'
import { ProjectsService } from 'src/app/shared/services/projects/projects.service'
import { MetricsService } from '../../services/metrics/metrics.service'

type ChartValue = {
  name: string
  value: number
}

type AgeRanges = {
  range1: string
  range2: string
  range3: string
  range4: string
  range5: string
  range6: string
  range7: string
  range8: string
  range9: string
}

type DonationAmountRanges = {
  amount0: string
  amount1: string
  amount2: string
  amount3: string
  amount4: string
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  providers: [ShortNumberPipe],
})
export class ChartsComponent implements OnInit {
  selectedProjectId: string | null = this.route.snapshot.paramMap.get('id')
  projectData!: CreateProjectResponse

  provinceData!: ChartValue[]
  ageData!: ChartValue[]
  donationAmountData!: ChartValue[]

  chartData!: GetMetricsResponse['body']

  backButtonAction = (): void =>
    void this.router.navigate(['/admin/metrics/overview/', this.selectedProjectId])

  constructor(
    private shortNumberPipe: ShortNumberPipe,
    private projects: ProjectsService,
    private location: LocationService,
    private metrics: MetricsService,
    private router: Router,
    private route: ActivatedRoute,
    private donations: DonationsService,
    public layout: LayoutService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getProjectData()
    await this.getChartData()
    await this.setValues()
  }

  async getProjectData(): Promise<void> {
    if (!!this.selectedProjectId) {
      this.projectData = await this.projects.getProject(Number(this.selectedProjectId)).toPromise()
    }
  }

  async getChartData(): Promise<void> {
    if (!this.selectedProjectId) return
    const chartData = await this.metrics
      .getChartData(Number(this.selectedProjectId))
      .pipe(take(1))
      .toPromise()

    this.chartData = chartData.body
  }

  async setValues(): Promise<void> {
    this.donationAmountData = this.convertDonationAmount()
    this.ageData = this.convertAges()
    this.provinceData = await this.convertProvinces()
  }

  async convertProvinces(): Promise<ChartValue[]> {
    const provinceData: ChartValue[] = []

    await Promise.all(
      Object.entries(this.chartData.Provinces).map(async ([province, value]) => {
        const selectedProvince = Number(province.replace('p', ''))

        const name = await this.location.getProvinceById(selectedProvince)

        provinceData.push({ name, value })
      }),
    )

    return provinceData
  }

  convertAges(): ChartValue[] {
    const ageData: ChartValue[] = []

    const ranges: AgeRanges = {
      range1: '-18',
      range2: '18 - 25',
      range3: '26 - 30',
      range4: '31 - 40',
      range5: '41 - 50',
      range6: '51 - 60',
      range7: '61 - 70',
      range8: '71 - 80',
      range9: '80+',
    }

    Object.entries(this.chartData.Ages).map(([range, value]) => {
      const selectedRange: keyof AgeRanges | undefined = !range.includes('age')
        ? (range as keyof AgeRanges)
        : undefined

      if (selectedRange) {
        const name = ranges[selectedRange]

        ageData.push({ name, value })
      }
    })

    return ageData
  }

  convertDonationAmount(): ChartValue[] {
    const donationAmountData: ChartValue[] = []

    const ranges: DonationAmountRanges = {
      amount0: `Menos de ${this.formatDonationAmount(0)}`,
      amount1: `${this.formatDonationAmount(0)} - ${this.formatDonationAmount(1)}`,
      amount2: `${this.formatDonationAmount(1)} - ${this.formatDonationAmount(2)}`,
      amount3: `${this.formatDonationAmount(2)} - ${this.formatDonationAmount(3)}`,
      amount4: `Más de ${this.formatDonationAmount(3)}`,
    }

    Object.entries(this.chartData.Amounts).map(([range, value]) => {
      const name = ranges[range as keyof DonationAmountRanges]
      donationAmountData.push({ name, value })
    })

    return donationAmountData
  }

  // Utils
  private formatDonationAmount(index: number): string {
    return `$ ${this.shortNumberPipe.transform(this.donations.donationAmountsConfig[index]) ?? '0'}`
  }
}
