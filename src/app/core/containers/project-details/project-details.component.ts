import { Component, OnChanges, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { lastValueFrom } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth/auth.service'
import { BackButton, ToolbarButtons } from 'src/app/core/components/toolbar/toolbar.component'
import { GetProjectResponse } from 'src/app/core/models/api.interface'
import { Project } from 'src/app/core/models/project.interface'
import { LayoutService } from 'src/app/core/services/layout/layout.service'
import { ShareService } from 'src/app/core/services/share/share.service'
import { environment } from 'src/environments/environment'
import { ProjectsService } from '../../services/projects/projects.service'

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit, OnChanges {
  isLoading = true

  toolbarButtons!: ToolbarButtons
  toolbarBackButton!: BackButton

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
    this.isLoading = false
  }

  ngOnChanges(): void {
    this.projectIsPrivate = this.projectData.visibility === 'PRIVATE'
  }

  async getProjectData(): Promise<void> {
    if (!!this.selectedProjectId) {
      this.projectData = await lastValueFrom(
        this.projects.getProject(Number(this.selectedProjectId)),
      )
      this.projectIsPrivate = this.projectData.visibility === 'PRIVATE'

      this.toolbarBackButton = (await this.auth.userIsAdmin())
        ? (): void => void this.router.navigate(['/admin/projects'])
        : (): void => void this.router.navigate(['/donor/projects'])

      this.toolbarButtons = [
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
                click: (): void =>
                  void this.router.navigate(['/admin/metrics/overview', this.projectData.id]),
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
    }
  }

  setProjectVisibility(id: Project['id'], visibility: Project['visibility']): void {
    void this.projects.setProjectVisibility(id, visibility).then(() => this.getProjectData())
  }

  shareAsLink(): void {
    this.share.shareAsLink(
      `https://devscholasfront.folclass.com/projects/read/${this.selectedProjectId ?? 'error'}`,
      'Se copió el link del proyecto',
    )
  }

  donateToProject(id: Project['id']): void {
    void this.router.navigate(['/donation/donate', id])
  }
}
