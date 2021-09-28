import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DonationCompletionStepComponent } from './donation-completion-step.component'

describe('DonationCompletionStepComponent', () => {
  let component: DonationCompletionStepComponent
  let fixture: ComponentFixture<DonationCompletionStepComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonationCompletionStepComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationCompletionStepComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
