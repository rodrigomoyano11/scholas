import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  isDesktop$!: Observable<boolean>

  constructor(private breakpoint$: BreakpointObserver) {
    this.breakpoint$
      .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe((response) => (this.isDesktop$ = of(response.matches)))
  }
}
