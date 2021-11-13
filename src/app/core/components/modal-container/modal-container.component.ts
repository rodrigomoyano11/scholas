import { Component, Input } from '@angular/core'
import { LayoutService } from '../../services/layout/layout.service'

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.css'],
})
export class ModalContainerComponent {
  @Input() size!: 'small' | 'medium' | 'large'
  @Input() withPadding = true
  @Input() withBorderRadius = true
  @Input() adjustHeight = false
  @Input() backgroundColor = '#fff'
  @Input() padding!: string

  constructor(public layout: LayoutService) {}
}
