import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CardData } from 'src/app/core/components/project-card/project-card.component'
import { ToolbarButtons } from 'src/app/core/components/toolbar/toolbar.component'
import { GetProjectResponse } from 'src/app/core/models/api.interface'
import { Project } from 'src/app/core/models/project.interface'
import { ProjectsService } from '../../../core/services/projects/projects.service'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  isLoading = true

  toolbarButtons: ToolbarButtons = [
    {
      style: 'primary',
      data: [
        {
          label: 'Filtrar proyectos',
          icon: 'filter_alt',
          action: {
            type: 'menu',
            click: (): undefined => undefined,
          },
        },
        {
          label: 'Agregar nuevo proyecto',
          icon: 'add',
          action: {
            type: 'button',
            click: (): void => void this.router.navigate(['/admin/projects/create']),
          },
        },
      ],
    },
  ]

  cardData: CardData[] = []

  constructor(public projects: ProjectsService, private router: Router) {}

  ngOnInit(): void {
    this.getProjects('all')
  }

  setCardData(project: GetProjectResponse): CardData {
    const projectIsPrivate = project.visibility === 'PRIVATE'
    this.isLoading = false

    return {
      type: 'admin',

      id: project.id,
      image: project.coverPhotoURL,

      title: project.name,
      subtitle: `${project.locality ?? ''} - ${project.province.name ?? ''}`,
      description: project.description,

      status: project.status,
      visibility: project.visibility,

      currentAmount: project.currentAmount,
      targetAmount: project.targetAmount,

      actions: {
        type: 'menu',
        data: [
          {
            label: 'Editar detalles',
            icon: 'edit',
            click: () => void this.router.navigate(['/admin/projects/update', project.id]),
          },
          {
            label: 'Ver métricas',
            icon: 'analytics',
            click: () => void this.router.navigate(['/admin/metrics/overview', project.id]),
          },
          {
            label: `Dar de ${projectIsPrivate ? 'alta' : 'baja'}`,
            icon: projectIsPrivate ? 'visibility' : 'visibility_off',
            click: () =>
              this.setProjectVisibility(project.id, projectIsPrivate ? 'public' : 'private'),
          },
        ],
      },

      primaryCTA: (): void => console.log('Works'),
      secondaryCTA: (): void => void this.router.navigate(['/projects/read/', project.id]),
    }
  }

  getProjects(filter: 'all' | 'finished' | 'inProgress' | 'public' | 'private'): void {
    const filters = {
      all: this.projects.getProjects(),
      finished: this.projects.getProjects('public', 'finished'),
      inProgress: this.projects.getProjects('public', 'inProgress'),
      public: this.projects.getProjects('public'),
      private: this.projects.getProjects('private'),
    }
    this.cardData = []
    filters[filter].subscribe((projects) =>
      projects.forEach((project) => this.cardData.push(this.setCardData(project))),
    )
  }

  setProjectVisibility(id: Project['id'], visibility: Project['visibility']): void {
    void this.projects.setProjectVisibility(id, visibility).then(() => this.getProjects('all'))
  }
}
