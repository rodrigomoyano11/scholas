import { Component, Input } from '@angular/core'
import { GetProjectResponse } from 'src/app/shared/models/Api'

import { LayoutService } from 'src/app/shared/services/layout/layout.service'

export interface CardData {
  id: GetProjectResponse['id']
  image: GetProjectResponse['coverPhotoURL']
  title: GetProjectResponse['name']
  subtitle: string
  description: GetProjectResponse['description']
  status: GetProjectResponse['status']
  visibility: GetProjectResponse['visibility']
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
