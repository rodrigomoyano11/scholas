import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-social-button',
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.css']
})
export default class SocialButtonComponent {
  @Input() method!: 'google' | 'facebook'
  @Output() clicked = new EventEmitter()

  constructor(private iconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg')
    )
    this.iconRegistry.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/google.svg')
    )
  }
}
