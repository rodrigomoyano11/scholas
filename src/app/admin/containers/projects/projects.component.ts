import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent, DialogData } from 'src/app/shared/components/dialog/dialog.component'
import { GetProjectResponse } from 'src/app/shared/models/Api'
import { Project } from 'src/app/shared/models/Project'
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
        callback: (): undefined => undefined,
      },
    },
    {
      label: 'Agregar nuevo proyecto',
      icon: 'add',
      action: {
        type: 'link',
        callback: (): string => '/admin/new-project',
      },
    },
  ]

  cardData: CardData[] = []

  constructor(private projects: ProjectsService, private dialog: MatDialog) {}

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

  async setProjectPrivate(id: Project['id']): Promise<void> {
    const isApproved = (await this.dialog
      .open<DialogComponent, DialogData>(DialogComponent, {
        data: {
          actions: ['Cancelar', 'Dar de baja'],
          title: null,
          description: '¿Estás seguro de dar de baja este proyecto?',
        },
      })
      .afterClosed()
      .toPromise()) as boolean

    if (isApproved)
      this.projects.setProjectVisibility(id, 'private').catch(() => this.getProjects('all'))
  }
  async setProjectPublic(id: Project['id']): Promise<void> {
    const isApproved = (await this.dialog
      .open<DialogComponent, DialogData>(DialogComponent, {
        data: {
          actions: ['Cancelar', 'Dar de alta'],
          title: null,
          description: '¿Estás seguro de dar de alta este proyecto?',
        },
      })
      .afterClosed()
      .toPromise()) as boolean

    if (isApproved)
      this.projects.setProjectVisibility(id, 'public').catch(() => this.getProjects('all'))
  }
}
