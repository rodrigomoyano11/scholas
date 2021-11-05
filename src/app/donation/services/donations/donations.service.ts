import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { take } from 'rxjs/operators'
import { AuthService } from 'src/app/auth/services/auth/auth.service'
import { GetDonationAmountsResponse } from 'src/app/shared/models/api.interface'
import { Donation } from 'src/app/shared/models/donation.interface'
import { Project } from 'src/app/shared/models/project.interface'
import { environment } from 'src/environments/environment'
import { DonationAmountSettingsForm } from '../../containers/donation-amounts-settings/donation-amounts-settings.component'

export interface DonationTest {
  id: string
  status: Donation['status']
  type: string
  amount: number
  createdDate: string
  userId: string
  projectId: number
  projectName: string
  paymentId: string
}

interface GetUserIdResponse {
  id: number
}

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

type CreateDonationData = {
  donation: Donation['amount']
  type: Donation['type']
  projectId: Project['id']
}

@Injectable({
  providedIn: 'root',
})
export class DonationsService {
  private _donations: DonationTest[] = [
    {
      id: '1',
      status: 'success',
      type: 'regular',
      amount: 300,
      createdDate: '2021-10-23',
      userId: '30454656495658',
      projectId: 1,
      projectName: 'Hogar de Niños "Dr. Marcial Rawson"',
      paymentId: '23475876',
    },
    {
      id: '2',
      status: 'pending',
      type: 'regular',
      amount: 300,
      createdDate: '2017-09-08',
      userId: '30454656495658',
      projectId: 1,
      projectName: 'Hospital de Oncología "Dr. René Favaloro"',
      paymentId: '23475876',
    },
    {
      id: '3',
      status: 'success',
      type: 'regular',
      amount: 300,
      createdDate: '2021-12-15',
      userId: '30454656495658',
      projectId: 1,
      projectName: 'Escuela de Mar y Playa',
      paymentId: '23475876',
    },
    {
      id: '4',
      status: 'failure',
      type: 'regular',
      amount: 700,
      createdDate: '2020-07-05',
      userId: '89745394587099',
      projectId: 2,
      projectName: 'Comedero "Manuel Belgrano"',
      paymentId: '75460977',
    },
    {
      id: '5',
      status: 'success',
      type: 'regular',
      amount: 700,
      createdDate: '2021-03-26',
      userId: '89347935023745',
      projectId: 3,
      projectName: 'Scholas San Juan',
      paymentId: '897349802',
    },
  ]

  donationAmountsConfig!: number[]

  constructor(private http: HttpClient, private auth: AuthService) {
    void this.getDonationAmounts()
  }

  // User Data
  async getUserId(): Promise<number> {
    const uid = (await this.auth.user$.pipe(take(1)).toPromise()).uid
    const response = await this.http
      .get<GetUserIdResponse>(`${environment.apiUrl}/users/${uid}`)
      .toPromise()

    return response.id
  }

  // Donations
  getDonations(): DonationTest[] {
    return this._donations
  }
  getDonationsByUserId(id: string): DonationTest[] {
    return this._donations.filter((donation) => donation.userId === id)
  }
  getDonation(id: string): DonationTest | null {
    return this._donations.find((donation) => donation.id === id) ?? null
  }

  async createDonation({ donation, type, projectId }: CreateDonationData): Promise<string> {
    const body = { donation, projectId, type, userId: await this.getUserId() }

    const response = await this.http
      .post<Response>(`${environment.apiUrl}/donations/create`, body)
      .toPromise()

    return (response.body as unknown as string) ?? ''
  }

  async editDonation(payment_id: string, preference_id: string): Promise<void> {
    await this.http
      .put<unknown>(
        `${environment.apiUrl}/donations/edit?paymentId=${payment_id}&preferenceId=${preference_id}`,
        {},
      )
      .toPromise()
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
      await this.http
        .get<GetDonationAmountsResponse>(`${environment.apiUrl}/amount?id=1`)
        .toPromise()
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

    await this.http.put(`${environment.apiUrl}/amount?id=1`, body).toPromise()
    await this.getDonationAmounts()
  }
}
