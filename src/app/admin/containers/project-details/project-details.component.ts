import { Clipboard } from '@angular/cdk/clipboard'
import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'src/app/auth/services/auth/auth.service'
import { ToolbarButtons } from 'src/app/shared/components/toolbar/toolbar.component'
import { GetProjectResponse } from 'src/app/shared/models/Api'
import { LayoutService } from 'src/app/shared/services/layout/layout.service'
import { ProjectsService } from '../../services/admins/projects/projects.service'

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  toolbarButtons: ToolbarButtons = []

  isAdmin = false

  selectedProjectId: string | null = this.route.snapshot.paramMap.get('id')
  projectData!: GetProjectResponse

  constructor(
    public layout: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private projects: ProjectsService,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    public auth: AuthService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getProjectData()
    this.auth.user$.subscribe((user) => (this.isAdmin = !(user.claims?.admin ?? false)))
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
              label: this.projectData.visibility === 'PUBLIC' ? 'Dar de baja' : 'Dar de alta',
              icon: null,
              action: {
                type: 'button',
                click: (): void =>
                  void this.projects
                    .setProjectVisibility(
                      this.projectData.id,
                      this.projectData.visibility === 'PUBLIC' ? 'private' : 'public',
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

  share(): void {
    this.clipboard.copy(window.location.href)
    this.snackBar.open('Se copió el link del proyecto', 'Cerrar', { duration: 3000 })
  }
}
