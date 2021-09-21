import { Component, Output, EventEmitter } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { DialogComponent, DialogData } from '../dialog/dialog.component'

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent {
  @Output() loadImage = new EventEmitter()
  @Output() unloadImage = new EventEmitter()

  image!: string | null

  constructor(private dialog: MatDialog) {
    this.image = null
  }

  deleteImage(): void {
    this.image = null
    this.unloadImage.emit()
  }

  onFileChange(event: Event): void {
    const reader = new FileReader()
    const target = event.target as HTMLInputElement
    const files = target.files as FileList

    if (files && files.length) {
      if (files[0].size > 8192 * 1024)
        return void this.dialog.open<DialogComponent, DialogData>(DialogComponent, {
          data: {
            actions: [null, 'Cerrar'],
            title: 'Ha ocurrido un error',
            description: 'El tamaño del archivo no debe superar los 5MB',
            icon: 'error',
          },
        })

      reader.readAsDataURL(files[0])

      reader.onload = () => {
        this.image = reader.result?.toString() ?? ''
        target.value = ''
        this.loadImage.emit(this.image)
      }
    }
  }
}
