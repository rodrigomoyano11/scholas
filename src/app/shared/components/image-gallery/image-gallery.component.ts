import { Component, Input, OnChanges } from '@angular/core'
import { LayoutService } from '../../services/layout/layout.service'

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css'],
})
export class ImageGalleryComponent implements OnChanges {
  @Input() images: string[] = []

  imagesConverted: { path: string }[] = []

  constructor(public layout: LayoutService) {}

  ngOnChanges(): void {
    this.images.map((image) => this.imagesConverted.push({ path: image }))
  }
}
