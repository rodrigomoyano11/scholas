import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DonationAmountsSettingsComponent } from './donation-amounts-settings.component'

describe('DonationAmountsSettingsComponent', () => {
  let component: DonationAmountsSettingsComponent
  let fixture: ComponentFixture<DonationAmountsSettingsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonationAmountsSettingsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationAmountsSettingsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
