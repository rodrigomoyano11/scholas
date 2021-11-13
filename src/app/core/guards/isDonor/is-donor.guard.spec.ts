import { TestBed } from '@angular/core/testing'

import { IsDonorGuard } from './is-donor.guard'

describe('IsDonorGuard', () => {
  let guard: IsDonorGuard

  beforeEach(() => {
    TestBed.configureTestingModule({})
    guard = TestBed.inject(IsDonorGuard)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })
})
