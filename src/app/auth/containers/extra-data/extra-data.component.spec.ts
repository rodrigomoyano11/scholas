import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ExtraDataComponent } from './extra-data.component'

describe('ExtraDataComponent', () => {
  let component: ExtraDataComponent
  let fixture: ComponentFixture<ExtraDataComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtraDataComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraDataComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
