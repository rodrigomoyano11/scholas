import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { lastValueFrom, take } from 'rxjs'
import {
  GetDonationAmountsResponse,
  GetDonationsByUserAndProjectResponse,
  GetDonationsByUserResponse,
} from 'src/app/shared/models/api.interface'
import { Donation } from 'src/app/shared/models/donation.interface'
import { Project } from 'src/app/shared/models/project.interface'
import { ProjectsService } from 'src/app/shared/services/projects/projects.service'
import { environment } from 'src/environments/environment'
import { DonationAmountSettingsForm } from '../../containers/donation-amounts-settings/donation-amounts-settings.component'

export interface MercadoPagoResponse {
  collection_id: string
  collection_status: string
  payment_id: string
  status: string
  external_reference: string
  payment_type: string
  merchant_order_id: string
  preference_id: string
  site_id: string
  processing_mode: string
  merchant_account_id: string
}

export interface DonationTest {
  amount: number
  registerAt: string
  userId: number
  projectId: number
  paymentId: string | null
  preferenceId: string | null
}

type CreateDonationData = {
  donation: Donation['amount']
  type: Donation['type']
  projectId: Project['id']
}

export interface DonationWithProjectName {
  projectName: string
  id: number
  projectId: number
  userId: number
  status: 'SUCCESS' | 'PENDING' | 'FAILURE' | null
  type: 'RECURRING' | 'REGULAR'
  paymentId: string | null
  amount: number
  registerAt: string
  preferenceId: string | null
}

@Injectable({
  providedIn: 'root',
})
export class DonationsService {
  _donations = [
    {
      id: 1,
      projectId: 1,
      userId: 4,
      status: null,
      type: 'RECURRING',
      paymentId: null,
      amount: 500.0,
      registerAt: '2021-11-05T09:03:02.000+00:00',
      preferenceId: null,
    },
  ]

  donationAmountsConfig!: number[]

  constructor(private http: HttpClient, private projects: ProjectsService) {
    void this.getDonationAmounts()
  }

  // User Data
  getUserId(): number {
    const userId = localStorage.getItem('userId')
    return Number(userId)
  }

  // Donations
  getDonations() {
    return Promise.resolve(this._donations)
  }

  async getDonationsByUserId(id: number): Promise<DonationWithProjectName[]> {
    const donations = await lastValueFrom(
      this.http.get<GetDonationsByUserResponse>(
        `${environment.apiUrl}/donations/list?userId=${id}`,
      ),
    )

    const projects = await lastValueFrom(this.projects.getProjects().pipe(take(1)))

    const donationsWithProjectNames = donations.map((donation) => {
      const projectName = projects.find((project) => project.id === donation.projectId)?.name ?? ''
      return {
        ...donation,
        projectName,
      }
    })

    return donationsWithProjectNames
  }

  async getDonationsByUserAndProject(
    userId: number,
    projectId: Project['id'],
  ): Promise<DonationWithProjectName[]> {
    const url = `${environment.apiUrl}/donations/list?userId=${userId}&projectId=${projectId}`

    const donations = await lastValueFrom(
      this.http.get<GetDonationsByUserAndProjectResponse[]>(url),
    )

    const projects = await lastValueFrom(this.projects.getProjects().pipe(take(1)))

    const donationsWithProjectNames = donations.map((donation) => {
      const projectName = projects.find((project) => project.id === donation.projectId)?.name ?? ''
      return {
        ...donation,
        projectName,
      }
    })

    return donationsWithProjectNames
  }

  async getDonationById(id: number): Promise<DonationWithProjectName | undefined> {
    const donationsWithProjectNames = await this.getDonationsByUserId(this.getUserId())

    return donationsWithProjectNames.find((donation) => donation.id === id)
  }

  // TODO: Borrar la siguiente función
  getDonation(id: number) {
    return this._donations.find((donation) => donation.id === id) ?? null
  }

  async createDonation({ donation, type, projectId }: CreateDonationData): Promise<string> {
    const body = { donation, projectId, type, userId: this.getUserId() }

    const response = await lastValueFrom(
      this.http.post<Response>(`${environment.apiUrl}/donations/create`, body),
    )

    return (response.body as unknown as string) ?? ''
  }

  async editDonation(payment_id: string, preference_id: string): Promise<void> {
    await lastValueFrom(
      this.http.put<unknown>(
        `${environment.apiUrl}/donations/edit?paymentId=${payment_id}&preferenceId=${preference_id}`,
        {},
      ),
    )
  }

  setDonationStatus(status: string): 'failure' | 'pending' | 'success' {
    if (status === 'approved') return 'success'

    if (status === 'pending' || status === 'authorized' || status === 'in_process') return 'pending'

    if (status === 'rejected' || status === 'cancelled') return 'failure'

    return 'failure'
  }

  // Donation Amounts

  async getDonationAmounts(): Promise<void> {
    const response = (
      await lastValueFrom(
        this.http.get<GetDonationAmountsResponse>(`${environment.apiUrl}/amount?id=1`),
      )
    )[0]
    this.donationAmountsConfig = [
      response.amount1,
      response.amount2,
      response.amount3,
      response.amount4,
    ]
  }
  async editDonationAmounts(amountsConfig: DonationAmountSettingsForm): Promise<void> {
    const { amount1, amount2, amount3, amount4 } = amountsConfig

    const body = { amount1, amount2, amount3, amount4 }

    await lastValueFrom(this.http.put(`${environment.apiUrl}/amount?id=1`, body))
    await this.getDonationAmounts()
  }
}
