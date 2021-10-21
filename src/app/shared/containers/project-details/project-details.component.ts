import { Component, OnChanges, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'src/app/auth/services/auth/auth.service'
import { BackButton, ToolbarButtons } from 'src/app/shared/components/toolbar/toolbar.component'
import { GetProjectResponse } from 'src/app/shared/models/api.interface'
import { Project } from 'src/app/shared/models/project.interface'
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
  toolbarBackButton!: BackButton

  userIsAdmin = true

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
    // this.auth.user$.subscribe((user) => (this.userIsAdmin = !(user.claims?.admin ?? false)))
  }

  ngOnChanges(): void {
    this.projectIsPrivate = this.projectData.visibility === 'PRIVATE'
  }

  async getProjectData(): Promise<void> {
    if (!!this.selectedProjectId) {
      this.projectData = await this.projects.getProject(Number(this.selectedProjectId)).toPromise()
      this.projectIsPrivate = this.projectData.visibility === 'PRIVATE'

      const adminButtons: ToolbarButtons = [
        {
          style: 'secondary',
          data: [
            {
              label: 'Editar detalles',
              icon: 'edit',
              action: {
                type: 'button',
                click: (): void =>
                  void this.router.navigate(['/admin/projects/update', this.projectData.id]),
              },
            },
            {
              label: 'Ver métricas',
              icon: 'analytics',
              action: {
                type: 'button',
                click: (): void => void this.router.navigate(['/admin/metrics']),
              },
            },
            {
              label: this.projectIsPrivate ? 'Dar de alta' : 'Dar de baja',
              icon: this.projectIsPrivate ? 'visibility' : 'visibility_off',
              action: {
                type: 'button',
                click: (): void =>
                  void this.setProjectVisibility(
                    this.projectData.id,
                    this.projectIsPrivate ? 'public' : 'private',
                  ),
              },
            },
          ],
        },
      ]

      this.toolbarButtons = this.userIsAdmin ? adminButtons : []
      this.toolbarBackButton = this.userIsAdmin
        ? (): void => void this.router.navigate(['/admin/projects'])
        : (): void => void this.router.navigate(['/donor/projects'])
    }
  }

  setProjectVisibility(id: Project['id'], visibility: Project['visibility']): void {
    void this.projects.setProjectVisibility(id, visibility).then(() => this.getProjectData())
  }

  shareAsLink(): void {
    this.share.shareAsLink(window.location.href, 'Se copió el link del proyecto')
  }

  donateToProject(id: Project['id']): void {
    void this.router.navigate(['/donation/donate', id])
  }
}
