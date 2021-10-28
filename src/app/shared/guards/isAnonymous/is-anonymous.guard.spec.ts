import { TestBed } from '@angular/core/testing'

import { IsAnonymousGuard } from './is-anonymous.guard'

describe('IsAnonymousGuard', () => {
  let guard: IsAnonymousGuard

  beforeEach(() => {
    TestBed.configureTestingModule({})
    guard = TestBed.inject(IsAnonymousGuard)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })
})
