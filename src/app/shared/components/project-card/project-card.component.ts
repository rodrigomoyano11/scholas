import { Component, Input } from '@angular/core'
import { GetProjectResponse } from '../../models/Api'
import { LayoutService } from '../../services/layout/layout.service'

export interface CardData {
  id: GetProjectResponse['id']
  image: GetProjectResponse['coverPhotoURL']
  title: GetProjectResponse['name']
  subtitle: string
  description: GetProjectResponse['description']
  status: GetProjectResponse['status']
  visibility: GetProjectResponse['visibility']
  mainAction: () => unknown
}

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent {
  @Input() id!: CardData['id']
  @Input() image!: CardData['image']
  @Input() title!: CardData['title']
  @Input() subtitle!: CardData['subtitle']
  @Input() description!: CardData['description']
  @Input() status!: CardData['status']
  @Input() visibility!: CardData['visibility']
  @Input() mainAction!: CardData['mainAction']

  constructor(public layout: LayoutService) {}
}
