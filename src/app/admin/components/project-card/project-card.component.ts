import { Component, Input } from '@angular/core'
import { LayoutService } from 'src/app/shared/services/layout/layout.service'

export interface CardData {
  image: string
  title: string
  subtitle: string
  description: string
}

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent {
  @Input() image!: string
  @Input() title!: string
  @Input() subtitle!: string
  @Input() description!: string

  constructor(public layout: LayoutService) {}

  action(): void {
    console.log('Works')
  }
}
