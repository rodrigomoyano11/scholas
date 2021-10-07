import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CreateProjectResponse } from 'src/app/shared/models/api.interface'
import { Project } from 'src/app/shared/models/project.interface'
import { ProjectsService } from 'src/app/shared/services/projects/projects.service'

@Component({
  selector: 'app-metrics-project-list',
  templateUrl: './metrics-project-list.component.html',
  styleUrls: ['./metrics-project-list.component.css'],
})
export class MetricsProjectListComponent implements OnInit {
  projectData: CreateProjectResponse[] = []

  constructor(private router: Router, public projects: ProjectsService) {}

  ngOnInit(): void {
    this.projects
      .getProjects()
      .subscribe((projects) => projects.forEach((project) => this.projectData.push(project)))
  }

  goToMetrics(id: Project['id']): void {
    void this.router.navigate(['/admin/projects/read/', id])
  }
}
