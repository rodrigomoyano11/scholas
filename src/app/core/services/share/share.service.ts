import { Clipboard } from '@angular/cdk/clipboard'
import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor(private clipboard: Clipboard, private snackBar: MatSnackBar) {}

  shareAsLink(textToCopy: string, message: string): void {
    this.clipboard.copy(textToCopy)
    this.snackBar.open(message, 'Cerrar', { duration: 3000 })
  }
}
