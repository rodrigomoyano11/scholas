import { Component, Input, OnChanges } from '@angular/core'
import { GetProjectResponse } from '../../models/Api'
import { LayoutService } from '../../services/layout/layout.service'

export interface CardDataOLD {
  id: GetProjectResponse['id']
  image: GetProjectResponse['coverPhotoURL']
  title: GetProjectResponse['name']
  subtitle: string
  description: GetProjectResponse['description']
  status: GetProjectResponse['status']
  visibility: GetProjectResponse['visibility']
  mainAction: () => unknown
}
export interface CardData {
  type: 'admin' | 'donor'

  id: GetProjectResponse['id']
  image: GetProjectResponse['coverPhotoURL']

  title: GetProjectResponse['name']
  subtitle: string
  description: GetProjectResponse['description']

  status: GetProjectResponse['status']
  visibility: GetProjectResponse['visibility']

  currentAmount: GetProjectResponse['currentAmount']
  targetAmount: GetProjectResponse['targetAmount']

  actions: {
    type: 'button' | 'menu'
    data: {
      label?: string
      icon?: string
      click: () => unknown
    }[]
  }

  primaryCTA: () => unknown
  secondaryCTA: () => unknown
}

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent implements OnChanges {
  @Input() projectData!: CardData

  userIsAdmin = false
  projectIsPrivate!: boolean

  constructor(public layout: LayoutService) {}

  ngOnChanges(): void {
    this.projectIsPrivate = this.projectData.visibility === 'PRIVATE'
    this.userIsAdmin = this.projectData.type === 'admin'
  }
}
