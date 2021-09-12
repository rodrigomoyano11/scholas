import { Component, Input } from '@angular/core'

export interface CardData {
  image: string
  title: string
  subtitle: string
  description: string
}

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent {
  @Input() image!: string
  @Input() title!: string
  @Input() subtitle!: string
  @Input() description!: string

  action(): void {
    console.log('Works')
  }
}
