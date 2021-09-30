import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CardData } from 'src/app/shared/components/project-card/project-card.component'
import { ToolbarButtons } from 'src/app/shared/components/toolbar/toolbar.component'
import { GetProjectResponse } from 'src/app/shared/models/Api'
import { Project } from 'src/app/shared/models/Project'
import { ProjectsService } from '../../../shared/services/projects/projects.service'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
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
            click: (): void => void this.router.navigate(['/admin/new-project']),
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

    return {
      type: 'admin',

      id: project.id,
      image: project.coverPhotoURL,

      title: project.name,
      subtitle: `${project.locality ?? ''} - ${project.province ?? ''}`,
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
            click: () => this.router.navigate(['/admin/edit-project', project.id]),
          },
          {
            label: 'Ver métricas',
            icon: 'analytics',
            click: () => console.log('Works'),
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
      secondaryCTA: (): void => void this.router.navigate(['/admin/projects', project.id]),
    }
  }

  getProjects(filter: 'all' | 'finished' | 'inProgress' | 'public' | 'private'): void {
    const filters = {
      all: this.projects.getProjects(),
      finished: this.projects.getProjects('public', 'finished'),
      inProgress: this.projects.getProjects('public', 'inProgress'),
      public: this.projects.getProjects('public'),
      private: this.projects.getProjects('public'),
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
