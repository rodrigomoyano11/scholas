/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core'
import { GetProjectsResponse } from 'src/app/shared/models/api'
import { ButtonData } from '../../components/list-header/list-header.component'
import { CardData } from '../../components/project-card/project-card.component'
import { ProjectsService } from '../../services/admins/projects/projects.service'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  buttonsData: ButtonData[] = [
    {
      label: 'Filtrar proyectos',
      icon: 'filter_alt',
      action: {
        type: 'menu',
        callback: () => undefined,
      },
    },
    {
      label: 'Agregar nuevo proyecto',
      icon: 'add',
      action: {
        type: 'link',
        callback: () => '/admin/new-project',
      },
    },
  ]

  cardData: CardData[] = []

  constructor(private projects: ProjectsService) {}

  ngOnInit(): void {
    this.getProjects('all')
  }

  setCardData(project: GetProjectsResponse) {
    return {
      id: project.id,
      image: project.coverPhotoURL,
      title: project.name,
      subtitle: `${project.locality} - ${project.province}`,
      description: project.description,
      status: project.status,
      visibility: project.visibility,
    }
  }

  getProjects(filter: 'all' | 'finished' | 'inProgress' | 'public' | 'private') {
    const filters = {
      all: this.projects.getProjects(),
      finished: this.projects.getProjects('finished', 'public'),
      inProgress: this.projects.getProjects('inProgress', 'public'),
      public: this.projects.getProjects('started', 'public'),
      private: this.projects.getProjects('started', 'private'),
    }
    this.cardData = []
    return filters[filter].subscribe((projects) =>
      projects.forEach((project) => this.cardData.push(this.setCardData(project))),
    )
  }

  action(): void {
    console.log('Works')
  }

  setProjectPrivate(): void {
    this.projects.setProjectVisibility('1', 'private').catch(() => this.getProjects('all'))
  }
  setProjectPublic(): void {
    this.projects.setProjectVisibility('1', 'public').catch(() => this.getProjects('all'))
  }
}
