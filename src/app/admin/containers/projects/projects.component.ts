import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/auth/services/auth/auth.service'
import { CardData } from 'src/app/shared/components/project-card/project-card.component'
import { Buttons } from 'src/app/shared/components/toolbar/toolbar.component'
import { GetProjectResponse } from 'src/app/shared/models/Api'
import { Project } from 'src/app/shared/models/Project'
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

  userIsAdmin = !false

  constructor(
    public projects: ProjectsService,
    private router: Router,
    private auth: AuthService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  async ngOnInit(): Promise<void> {
    // const { claims } = await this.auth.user$.toPromise()
    // this.userIsAdmin = claims?.admin ?? false

    this.getProjects('all')
  }

  setCardData(project: GetProjectResponse): CardData {
    return {
      type: this.userIsAdmin ? 'admin' : 'donor',

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
        type: this.userIsAdmin ? 'menu' : 'button',
        data: this.userIsAdmin
          ? [
              {
                label: 'Editar detalles',
                click: () => this.router.navigate(['/admin/edit-project', project.id]),
              },
              {
                label: 'Ver métricas',
                click: () => console.log('Works'),
              },
              {
                label: `Dar de ${project.visibility === 'PUBLIC' ? 'baja' : 'alta'}`,
                click: () =>
                  this.setProjectVisibility(
                    project.id,
                    project.visibility === 'PRIVATE' ? 'public' : 'private',
                  ),
              },
            ]
          : [
              {
                label: 'Compartir',
                icon: 'share',
                click: () => console.log('Works'),
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

  setProjectVisibility(id: Project['id'], visibility: Project['visibility']): void {
    void this.projects.setProjectVisibility(id, visibility).catch(() => this.getProjects('all'))
  }
}
