import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DonationPaymentStepComponent } from './donation-payment-step.component'

describe('DonationPaymentStepComponent', () => {
  let component: DonationPaymentStepComponent
  let fixture: ComponentFixture<DonationPaymentStepComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonationPaymentStepComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationPaymentStepComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
