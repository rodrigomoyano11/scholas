import { Component, Input } from '@angular/core'

export interface ButtonData {
  label: string
  icon: string
  action: {
    type: 'link' | 'button'
    callback: () => string | void
  }
}

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.css'],
})
export class ListHeaderComponent {
  @Input() title!: string

  @Input() buttons!: ButtonData[]
}
