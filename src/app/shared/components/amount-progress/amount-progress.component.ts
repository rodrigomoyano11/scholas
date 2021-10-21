import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-amount-progress',
  templateUrl: './amount-progress.component.html',
  styleUrls: ['./amount-progress.component.css'],
})
export class AmountProgressComponent {
  @Input() type!: 'mobile' | 'desktop'
  @Input() targetAmount!: number
  @Input() currentAmount!: number
}
