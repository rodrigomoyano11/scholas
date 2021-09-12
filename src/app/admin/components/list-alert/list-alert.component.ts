import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-list-alert',
  templateUrl: './list-alert.component.html',
  styleUrls: ['./list-alert.component.css'],
})
export class ListAlertComponent {
  @Input() alert!: string
  @Input() alertCondition!: boolean
}
