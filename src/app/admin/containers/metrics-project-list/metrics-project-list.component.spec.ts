import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MetricsProjectListComponent } from './metrics-project-list.component'

describe('MetricsProjectListComponent', () => {
  let component: MetricsProjectListComponent
  let fixture: ComponentFixture<MetricsProjectListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetricsProjectListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsProjectListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
