import { Clipboard } from '@angular/cdk/clipboard'
import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { GetProjectResponse } from 'src/app/shared/models/Api'
import { LayoutService } from 'src/app/shared/services/layout/layout.service'
import { Buttons } from '../../components/toolbar/toolbar.component'
import { ProjectsService } from '../../services/admins/projects/projects.service'

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  selectedProjectId: string | null = this.route.snapshot.paramMap.get('id')
  projectData!: GetProjectResponse
  buttons: Buttons = []

  constructor(
    public layout: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private projects: ProjectsService,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getProjectData()
  }

  async getProjectData(): Promise<void> {
    if (!!this.selectedProjectId) {
      this.projectData = await this.projects.getProject(+this.selectedProjectId).toPromise()

      this.buttons = [
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
    }
  }

  share(): void {
    this.clipboard.copy(window.location.href)
    this.snackBar.open('Se copió el link del proyecto', 'Cerrar', { duration: 3000 })
  }
}
