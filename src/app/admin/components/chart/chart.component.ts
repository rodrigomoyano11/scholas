import { Component, Input } from '@angular/core'
import { ScaleType } from '@swimlane/ngx-charts'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  @Input() type: 'horizontal' | 'vertical' = 'vertical'
  @Input() size: 'sm' | 'md' | 'lg' = 'md'
  @Input() data: Array<unknown> = []
  @Input() title = ''

  colorScheme = {
    name: 'Scholas',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#009993', '#B3E0E0'],
  }
}
