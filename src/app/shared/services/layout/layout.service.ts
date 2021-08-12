import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  isDesktop!: boolean

  constructor(private breakpoint$: BreakpointObserver) {
    this.breakpoint$
      .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe((response) => (this.isDesktop = response.matches))
  }
}
