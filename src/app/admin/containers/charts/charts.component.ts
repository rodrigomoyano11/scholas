import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { ShortNumberPipe } from 'src/app/shared/pipes/short-number.pipe'

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  providers: [ShortNumberPipe],
})
export class ChartsComponent {
  donationAmountsConfig = [500, 1000, 2000, 5000]

  provincesData = [
    {
      name: 'Buenos Aires',
      value: 14,
    },
    {
      name: 'San Juan',
      value: 35,
    },
    {
      name: 'Mendoza',
      value: 82,
    },
    {
      name: 'San Luis',
      value: 46,
    },
    {
      name: 'Santa Cruz',
      value: 10,
    },
    {
      name: 'Formosa',
      value: 4,
    },
    {
      name: 'Santiago del Estero',
      value: 39,
    },
    {
      name: 'Córdoba',
      value: 85,
    },
    {
      name: 'La Pampa',
      value: 52,
    },
  ]
  agesData = [
    {
      name: '-18',
      value: 14,
    },
    {
      name: '18 - 25',
      value: 35,
    },
    {
      name: '26 - 30',
      value: 82,
    },
    {
      name: '31 - 40',
      value: 46,
    },
    {
      name: '41 - 50',
      value: 10,
    },
    {
      name: '51 - 60',
      value: 4,
    },
    {
      name: '61 - 70',
      value: 39,
    },
    {
      name: '71 - 80',
      value: 85,
    },
    {
      name: '80+',
      value: 52,
    },
  ]
  donationAmountsData = [
    {
      name: `Menos de ${this.getDonationAmount(0)}`,
      value: 14,
    },
    {
      name: `${this.getDonationAmount(0)} - ${this.getDonationAmount(1)}`,
      value: 35,
    },
    {
      name: `${this.getDonationAmount(1)} - ${this.getDonationAmount(2)}`,
      value: 29,
    },
    {
      name: `${this.getDonationAmount(2)} - ${this.getDonationAmount(3)}`,
      value: 43,
    },
    {
      name: `Más de ${this.getDonationAmount(3)}`,
      value: 14,
    },
  ]

  backButtonAction = (): void => void this.router.navigate(['/admin/metrics/overview/1'])

  constructor(private router: Router, private shortNumberPipe: ShortNumberPipe) {}

  private getDonationAmount(index: number): string {
    return `$ ${this.shortNumberPipe.transform(this.donationAmountsConfig[index]) ?? '0'}`
  }
}
