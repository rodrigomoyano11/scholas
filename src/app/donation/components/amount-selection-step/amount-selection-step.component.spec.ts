import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AmountSelectionStepComponent } from './amount-selection-step.component'

describe('AmountSelectionStepComponent', () => {
  let component: AmountSelectionStepComponent
  let fixture: ComponentFixture<AmountSelectionStepComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmountSelectionStepComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountSelectionStepComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
