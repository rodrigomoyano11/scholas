import { Component, Input } from '@angular/core'
import { GetProjectsResponse } from 'src/app/shared/models/api'
import { LayoutService } from 'src/app/shared/services/layout/layout.service'

export interface CardData {
  id: GetProjectsResponse['id']
  image: GetProjectsResponse['coverPhotoURL']
  title: GetProjectsResponse['name']
  subtitle: string
  description: GetProjectsResponse['description']
  status: GetProjectsResponse['status']
  visibility: GetProjectsResponse['visibility']
}

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent implements CardData {
  @Input() id!: CardData['id']
  @Input() image!: CardData['image']
  @Input() title!: CardData['title']
  @Input() subtitle!: CardData['subtitle']
  @Input() description!: CardData['description']
  @Input() status!: CardData['status']
  @Input() visibility!: CardData['visibility']

  constructor(public layout: LayoutService) {}
}
