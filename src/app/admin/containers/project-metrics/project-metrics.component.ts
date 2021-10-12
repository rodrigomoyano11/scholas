import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ToolbarButtons } from 'src/app/shared/components/toolbar/toolbar.component'
import { CreateProjectResponse } from 'src/app/shared/models/api.interface'
import { LayoutService } from 'src/app/shared/services/layout/layout.service'
import { ProjectsService } from 'src/app/shared/services/projects/projects.service'

@Component({
  selector: 'app-project-metrics',
  templateUrl: './project-metrics.component.html',
  styleUrls: ['./project-metrics.component.css'],
})
export class ProjectMetricsComponent implements OnInit {
  toolbarButtons: ToolbarButtons = [
    {
      style: 'secondary',
      data: [
        {
          label: 'Donar a un proyecto',
          icon: 'add',
          action: {
            type: 'button',
            click: (): void => void this.router.navigate(['/admin/projects/update']),
          },
        },
      ],
    },
  ]

  backButtonAction = (): void => void this.router.navigate(['/admin/metrics'])

  selectedProjectId: string | null = this.route.snapshot.paramMap.get('id')
  projectData!: CreateProjectResponse

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projects: ProjectsService,
    public layout: LayoutService,
  ) {}

  async ngOnInit(): Promise<void> {
    if (!!this.selectedProjectId) {
      this.projectData = await this.projects.getProject(Number(this.selectedProjectId)).toPromise()
    }
  }
}
