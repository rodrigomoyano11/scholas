import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CardData } from 'src/app/shared/components/project-card/project-card.component'
import { GetProjectResponse } from 'src/app/shared/models/api.interface'
import { Project } from 'src/app/shared/models/project.interface'
import { ShareService } from 'src/app/shared/services/share/share.service'
import { ProjectsService } from '../../../shared/services/projects/projects.service'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
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
    return {
      type: 'donor',

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
      secondaryCTA: (): void => void this.router.navigate(['/admin/projects', project.id]),
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
    this.share.shareAsLink(`${window.location.href}/${projectId}`, 'Se copió el link del proyecto')
  }
}
