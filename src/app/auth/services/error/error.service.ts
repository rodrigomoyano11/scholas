import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent, DialogData } from 'src/app/core/components/dialog/dialog.component'

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(public dialog: MatDialog) {}

  openDialog(error: string): void {
    this.dialog.open<DialogComponent, DialogData>(DialogComponent, {
      data: {
        actions: [null, 'Cerrar'],
        title: 'Ha ocurrido un error',
        description: error,
        icon: 'error_outline',
      },
    })
  }
}
