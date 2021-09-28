import { Component, OnChanges, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'src/app/auth/services/auth/auth.service'
import { ToolbarButtons } from 'src/app/shared/components/toolbar/toolbar.component'
import { GetProjectResponse } from 'src/app/shared/models/Api'
import { Project } from 'src/app/shared/models/Project'
import { LayoutService } from 'src/app/shared/services/layout/layout.service'
import { ShareService } from 'src/app/shared/services/share/share.service'
import { ProjectsService } from '../../services/projects/projects.service'

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit, OnChanges {
  toolbarButtons: ToolbarButtons = []

  isAdmin = true

  projectIsPrivate!: boolean

  selectedProjectId: string | null = this.route.snapshot.paramMap.get('id')
  projectData!: GetProjectResponse

  constructor(
    public layout: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private projects: ProjectsService,
    public auth: AuthService,
    private share: ShareService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getProjectData()
    this.auth.user$.subscribe((user) => (this.isAdmin = !(user.claims?.admin ?? false)))
  }

  ngOnChanges(): void {
    this.projectIsPrivate = this.projectData.visibility === 'PRIVATE'
  }

  async getProjectData(): Promise<void> {
    if (!!this.selectedProjectId) {
      this.projectData = await this.projects.getProject(+this.selectedProjectId).toPromise()

      const adminButtons: ToolbarButtons = [
        {
          style: 'primary',
          data: [
            {
              label: 'Volver',
              icon: 'chevron_left',
              action: {
                type: 'button',
                click: (): void => void this.router.navigate(['/admin/projects']),
              },
            },
          ],
        },
        {
          style: 'secondary',
          data: [
            {
              label: 'Editar detalles',
              icon: null,
              action: {
                type: 'button',
                click: (): void =>
                  void this.router.navigate(['/admin/edit-project', this.projectData.id]),
              },
            },
            {
              label: 'Métricas',
              icon: null,
              action: {
                type: 'button',
                click: (): void => console.log('Works'),
              },
            },
            {
              label: this.projectIsPrivate ? 'Dar de alta' : 'Dar de baja',
              icon: null,
              action: {
                type: 'button',
                click: (): void =>
                  void this.projects
                    .setProjectVisibility(
                      this.projectData.id,
                      this.projectIsPrivate ? 'public' : 'private',
                    )
                    .catch(() => this.getProjectData()),
              },
            },
          ],
        },
      ]
      const donorButtons: ToolbarButtons = [
        {
          style: 'primary',
          data: [
            {
              label: 'Volver',
              icon: 'chevron_left',
              action: {
                type: 'button',
                click: (): void => void this.router.navigate(['/donor/projects']),
              },
            },
          ],
        },
      ]

      this.toolbarButtons = this.isAdmin ? adminButtons : donorButtons
    }
  }

  shareAsLink(): void {
    this.share.shareAsLink(window.location.href, 'Se copió el link del proyecto')
  }

  donateToProject(id: Project['id']): void {
    void this.router.navigate(['/donation/donate', id])
  }
}
