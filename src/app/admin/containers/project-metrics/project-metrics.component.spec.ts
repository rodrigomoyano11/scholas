import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProjectMetricsComponent } from './project-metrics.component'

describe('ProjectMetricsComponent', () => {
  let component: ProjectMetricsComponent
  let fixture: ComponentFixture<ProjectMetricsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectMetricsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMetricsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
