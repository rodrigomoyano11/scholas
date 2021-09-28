import { Component, Input } from '@angular/core'

export type ToolbarButtons = {
  style: 'primary' | 'secondary'
  data: ButtonData[]
}[]

interface ButtonData {
  label: string
  icon: string | null
  action: {
    type: 'button' | 'menu'
    click: () => unknown
  }
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  @Input() title!: string
  @Input() fullWidth = false
  @Input() buttons: ToolbarButtons = []
}
