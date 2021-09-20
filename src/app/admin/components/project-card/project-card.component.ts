import { Component, Input } from '@angular/core'
import { GetProjectsResponse } from 'src/app/shared/models/api'
import { LayoutService } from 'src/app/shared/services/layout/layout.service'

export interface CardData {
  image: string
  title: string
  subtitle: string
  description: string
  status: GetProjectsResponse['status']
  visibility: GetProjectsResponse['visibility']
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
  @Input() status!: GetProjectsResponse['status']
  @Input() visibility!: GetProjectsResponse['visibility']

  constructor(public layout: LayoutService) {}

  action(): void {
    console.log('Works')
  }
}
