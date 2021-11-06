import { animate, state, style, transition, trigger } from '@angular/animations'
import { Component } from '@angular/core'
import {
  DonationsService,
  DonationTest,
} from 'src/app/donation/services/donations/donations.service'

interface DonorData {
  fullName: string
  province: string
  locality: string
  email: string
  number: string
  donationsQuantity: number
  totalAmount: number
  donations: DonationTest[]
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
export class MetricsListComponent {
  columnNames = {
    fullName: 'Donante',
    donationsQuantity: 'Cantidad de Donaciones',
    totalAmount: 'Importe donado',
    action: ' ',
  }

  dataSource: DonorData[] = [
    {
      fullName: 'Rodrigo Moyano',
      province: 'San Juan',
      locality: 'Capital',
      email: 'email@email.com',
      number: '265 587 4332',
      donationsQuantity: 5,
      totalAmount: 730,
      donations: this.donations._donations,
    },
    {
      fullName: 'Juan José',
      province: 'San Juan',
      locality: 'Capital',
      email: 'email@email.com',
      number: '265 587 4332',
      donationsQuantity: 234,
      totalAmount: 4540,
      donations: this.donations._donations,
    },
    {
      fullName: 'Francisco González',
      province: 'San Juan',
      locality: 'Capital',
      email: 'email@email.com',
      number: '265 587 4332',
      donationsQuantity: 4,
      totalAmount: 980,
      donations: this.donations._donations,
    },
    {
      fullName: 'Macarena Pérez',
      province: 'San Juan',
      locality: 'Capital',
      email: 'email@email.com',
      number: '265 587 4332',
      donationsQuantity: 53,
      totalAmount: 430,
      donations: this.donations._donations,
    },
    {
      fullName: 'Sherlock Holmes',
      province: 'San Juan',
      locality: 'Capital',
      email: 'email@email.com',
      number: '265 587 4332',
      donationsQuantity: 44,
      totalAmount: 7530,
      donations: this.donations._donations,
    },
  ]
  columnsToDisplay: ['fullName', 'donationsQuantity', 'totalAmount', 'action'] = [
    'fullName',
    'donationsQuantity',
    'totalAmount',
    'action',
  ]
  expandedElement: DonorData | null = null

  constructor(private donations: DonationsService) {}
}
