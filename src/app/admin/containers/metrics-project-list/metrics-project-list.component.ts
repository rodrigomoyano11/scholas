import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CreateProjectResponse } from 'src/app/core/models/api.interface'
import { Project } from 'src/app/core/models/project.interface'
import { ProjectsService } from 'src/app/core/services/projects/projects.service'

@Component({
  selector: 'app-metrics-project-list',
  templateUrl: './metrics-project-list.component.html',
  styleUrls: ['./metrics-project-list.component.css'],
})
export class MetricsProjectListComponent implements OnInit {
  isLoading = true
  projectData: CreateProjectResponse[] = []

  constructor(private router: Router, private projects: ProjectsService) {}

  ngOnInit(): void {
    this.projects.getProjects().subscribe((projects) => {
      projects.forEach((project) => this.projectData.push(project))
      this.isLoading = false
    })
  }

  goToMetrics(id: Project['id']): void {
    void this.router.navigate(['/admin/metrics/overview', id])
  }
}
