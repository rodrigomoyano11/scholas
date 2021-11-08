import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { lastValueFrom } from 'rxjs'
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
  backButtonAction = (): void => void this.router.navigate(['/admin/metrics'])

  tableActions: ToolbarButtons = [
    {
      style: 'quaternary',
      data: [
        {
          label: 'Filtrar',
          icon: 'filter_list',
          action: {
            type: 'overlay',
            click: (): void => console.log('Works'),
          },
        },
        {
          label: 'Ordenar',
          icon: 'sort',
          action: {
            type: 'menu',
            click: (): void => console.log('Works'),
          },
        },
        {
          label: 'Descargar',
          icon: 'file_download',
          action: {
            type: 'button',
            click: (): void => console.log('Works'),
          },
        },
      ],
    },
  ]

  filtersIsOpen = false

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
      this.projectData = await lastValueFrom(
        this.projects.getProject(Number(this.selectedProjectId)),
      )
    }
  }

  goToCharts(): void {
    void this.router.navigate(['admin/metrics/charts', this.selectedProjectId])
  }
}
