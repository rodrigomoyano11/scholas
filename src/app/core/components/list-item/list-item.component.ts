import { Component, EventEmitter, Input, Output } from '@angular/core'
import { BadgeComponent } from '../badge/badge.component'

export interface BadgeStatus {
  type: BadgeComponent['status']
  label: BadgeComponent['label']
}

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent {
  @Output() clickEvent = new EventEmitter()
  @Input() icon = 'add'
  @Input() image!: string | null
  @Input() title!: string | null
  @Input() subtitle!: string | null
  @Input() disabled = false
  @Input() actionItem!: boolean
  @Input() status!: BadgeStatus | null
}
