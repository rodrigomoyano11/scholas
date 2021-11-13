import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CardData } from 'src/app/core/components/project-card/project-card.component'
import { GetProjectResponse } from 'src/app/core/models/api.interface'
import { Project } from 'src/app/core/models/project.interface'
import { ShareService } from 'src/app/core/services/share/share.service'
import { environment } from 'src/environments/environment'
import { ProjectsService } from '../../../core/services/projects/projects.service'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  isLoading = true
  cardData: CardData[] = []

  constructor(
    public projects: ProjectsService,
    private router: Router,
    private share: ShareService,
  ) {}

  ngOnInit(): void {
    this.getProjects()
  }

  setCardData(project: GetProjectResponse): CardData {
    this.isLoading = false
    return {
      type: 'donor',

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
        type: 'button',
        data: [
          {
            label: 'Compartir',
            icon: 'share',
            click: () => this.shareAsLink(project.id),
          },
        ],
      },

      primaryCTA: (): void => void this.router.navigate(['/donation/donate', project.id]),
      secondaryCTA: (): void => void this.router.navigate(['/projects/read/', project.id]),
    }
  }

  getProjects(): void {
    this.projects
      .getProjects('public')
      .subscribe((projects) =>
        projects.forEach((project) => this.cardData.push(this.setCardData(project))),
      )
  }

  shareAsLink(projectId: Project['id']): void {
    this.share.shareAsLink(
      `https://devscholasfront.folclass.com/projects/read/${projectId}`,
      'Se copió el link del proyecto',
    )
  }
}
