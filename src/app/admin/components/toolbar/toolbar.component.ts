import { Component, Input } from '@angular/core'

export interface ToolbarData {
  title?: string
  fullWidth?: boolean
  leftButtons?: {
    style: 'primary' | 'secondary'
    data: ButtonData[]
  }
  rightButtons?: {
    style: 'primary' | 'secondary'
    data: ButtonData[]
  }
}
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
  @Input() toolbarData: ToolbarData = {
    fullWidth: false,
  }
}
