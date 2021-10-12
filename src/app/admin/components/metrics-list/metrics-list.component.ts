import { animate, state, style, transition, trigger } from '@angular/animations'
import { Component } from '@angular/core'

interface DonorData {
  fullName: string
  province: string
  locality: string
  donationsQuantity: number
  totalAmount: number
}
const ELEMENT_DATA: DonorData[] = [
  {
    fullName: 'Rodrigo Moyano',
    province: 'San Juan',
    locality: 'Capital',
    donationsQuantity: 5,
    totalAmount: 730,
  },
  {
    fullName: 'Juan José',
    province: 'San Juan',
    locality: 'Capital',
    donationsQuantity: 234,
    totalAmount: 4540,
  },
  {
    fullName: 'Francisco González',
    province: 'San Juan',
    locality: 'Capital',
    donationsQuantity: 4,
    totalAmount: 980,
  },
  {
    fullName: 'Macarena Pérez',
    province: 'San Juan',
    locality: 'Capital',
    donationsQuantity: 53,
    totalAmount: 430,
  },
  {
    fullName: 'Sherlock Holmes',
    province: 'San Juan',
    locality: 'Capital',
    donationsQuantity: 44,
    totalAmount: 7530,
  },
]

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

  dataSource = ELEMENT_DATA
  columnsToDisplay: ['fullName', 'donationsQuantity', 'totalAmount', 'action'] = [
    'fullName',
    'donationsQuantity',
    'totalAmount',
    'action',
  ]
  expandedElement: DonorData | null = null
}
