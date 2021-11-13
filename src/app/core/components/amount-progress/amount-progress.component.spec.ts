import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AmountProgressComponent } from './amount-progress.component'

describe('AmountProgressComponent', () => {
  let component: AmountProgressComponent
  let fixture: ComponentFixture<AmountProgressComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmountProgressComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountProgressComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
