import { Component, Output, EventEmitter, Input, OnInit, OnChanges } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { DialogComponent, DialogData } from '../dialog/dialog.component'

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent implements OnInit, OnChanges {
  @Input() maxUploads = 3
  @Input() initialImages: string[] = []

  @Output() loaded = new EventEmitter<string[]>()

  images: string[] = []

  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {
    this.setInitialImages()
  }

  ngOnChanges(): void {
    this.setInitialImages()
  }

  setInitialImages(): void {
    this.initialImages.map(async (initialImage) => {
      const response = await fetch(initialImage)

      const data = await response.blob()
      const metadata = { type: 'image/jpg' }
      const file = (await this.handleSelectedFile(
        new File([data], initialImage, metadata),
      )) as string

      this.images.push(file)
    })
    this.loaded.emit(this.images)
  }

  onFilesChange(event: Event): void {
    const target = event.target as HTMLInputElement
    const files = target.files as FileList

    try {
      if (files && files.length) {
        if (files.length > this.maxUploads)
          throw `No puedes subir más de ${this.maxUploads} archivos`

        Array.from(files).forEach((file: File): void => {
          const regex = /(\.jfif|\.pjpeg|\.jpeg|\.pjp|\.jpg)$/i
          if (!regex.test(file.name)) throw 'Tipo de archivo no soportado'

          if (file.size > 8192 * 1024) throw 'El tamaño del archivo no debe superar los 5MB'

          this.handleSelectedFile(file)
            .then((convertedFile) => {
              convertedFile && this.images.push(convertedFile.toString())
              target.value = ''
            })
            .catch(() => {
              throw 'El archivo no se ha cargado correctamente, intentá otra vez'
            })
        })
        this.loaded.emit(this.images)
      }
    } catch (error) {
      target.value = ''
      void this.dialog.open<DialogComponent, DialogData>(DialogComponent, {
        data: {
          actions: [null, 'Cerrar'],
          title: 'Ha ocurrido un error',
          description: error as string,
          icon: 'error',
        },
      })
    }
  }

  async handleSelectedFile(file: File): Promise<FileReader['result']> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  deleteImage(i: number): void {
    this.images.splice(i, 1)
    this.loaded.emit(this.images)
  }
}
