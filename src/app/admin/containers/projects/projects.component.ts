import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Buttons } from 'src/app/shared/components/toolbar/toolbar.component'
import { GetProjectResponse } from 'src/app/shared/models/Api'
import { Project } from 'src/app/shared/models/Project'
import { CardData } from '../../components/project-card/project-card.component'
import { ProjectsService } from '../../services/admins/projects/projects.service'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  buttons: Buttons = [
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

  constructor(
    public projects: ProjectsService,

    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getProjects('all')
  }

  setCardData(project: GetProjectResponse): CardData {
    return {
      id: project.id,
      image: project.coverPhotoURL,
      title: project.name,
      subtitle: `${project.locality ?? ''} - ${project.province ?? ''}`,
      description: project.description,
      status: project.status,
      visibility: project.visibility,
      mainAction: (): void => void this.router.navigate(['/admin/projects', project.id]),
    }
  }

  getProjects(filter: 'all' | 'finished' | 'inProgress' | 'public' | 'private'): void {
    const filters = {
      all: this.projects.getProjects(),
      finished: this.projects.getProjects('finished', 'public'),
      inProgress: this.projects.getProjects('inProgress', 'public'),
      public: this.projects.getProjects('started', 'public'),
      private: this.projects.getProjects('started', 'private'),
    }
    this.cardData = []
    filters[filter].subscribe((projects) =>
      projects.forEach((project) => this.cardData.push(this.setCardData(project))),
    )
  }

  action(): void {
    console.log('Works')
  }

  setProjectVisibility(id: Project['id'], visibility: Project['visibility']): void {
    void this.projects.setProjectVisibility(id, visibility).catch(() => this.getProjects('all'))
  }
}
