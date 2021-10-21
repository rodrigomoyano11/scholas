import { Injectable } from '@angular/core'
import { Donation } from 'src/app/shared/models/donation.interface'

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

  getDonations(): DonationTest[] {
    return this._donations
  }
  getDonationsByUserId(id: string): DonationTest[] {
    return this._donations.filter((donation) => donation.userId === id)
  }

  getDonation(id: string): DonationTest | null {
    return this._donations.find((donation) => donation.id === id) ?? null
  }
}
