import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.css']
})
export class ModalContainerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'small'
}
