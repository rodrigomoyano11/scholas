import { Component, Input } from '@angular/core'

interface MetricsNumbers {
  type: 'number' | 'currency'
  color: 'gray' | 'green' | 'red'
  value: number
  description: string
}

@Component({
  selector: 'app-metrics-numbers',
  templateUrl: './metrics-numbers.component.html',
  styleUrls: ['./metrics-numbers.component.css'],
})
export class MetricsNumbersComponent {
  @Input() type!: MetricsNumbers['type']
  @Input() color: MetricsNumbers['color'] = 'gray'
  @Input() value!: MetricsNumbers['value']
  @Input() description!: MetricsNumbers['description']
}
