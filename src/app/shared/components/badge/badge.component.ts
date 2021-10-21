import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
})
export class BadgeComponent {
  @Input() type: 'primary' | 'secondary' = 'primary'
  @Input() status: 'success' | 'warn' | 'error' = 'error'
  @Input() label = ''
}
