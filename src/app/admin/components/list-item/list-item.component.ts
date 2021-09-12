import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent {
  @Output() clickEvent = new EventEmitter()
  @Input() icon = 'add'
  @Input() title!: string | null
  @Input() subtitle!: string | null
}
