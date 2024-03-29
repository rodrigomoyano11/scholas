import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateAdminComponent } from './create-admin.component'

describe('NewAdminComponent', () => {
  let component: CreateAdminComponent
  let fixture: ComponentFixture<CreateAdminComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAdminComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdminComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
