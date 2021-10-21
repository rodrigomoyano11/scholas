import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MetricsNumbersComponent } from './metrics-numbers.component'

describe('MetricsNumbersComponent', () => {
  let component: MetricsNumbersComponent
  let fixture: ComponentFixture<MetricsNumbersComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetricsNumbersComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsNumbersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
