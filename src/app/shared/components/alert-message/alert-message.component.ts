import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css'],
})
export class AlertMessageComponent {
  @Input() title!: string
  @Input() description!: string
}
