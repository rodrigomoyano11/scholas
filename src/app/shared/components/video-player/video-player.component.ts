import { Component, Input, OnChanges } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import getVideoId from 'get-video-id'

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnChanges {
  @Input() video!: string

  videoUrl!: SafeResourceUrl | null

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    this.getVideoId()
  }

  getVideoId(): void {
    const videoId = getVideoId(this.video).id
    const unsafeVideoUrl = videoId
      ? `https://www.youtube.com/embed/${videoId}?modestbranding=1&color=white`
      : null

    this.videoUrl = unsafeVideoUrl
      ? this.sanitizer.bypassSecurityTrustResourceUrl(unsafeVideoUrl)
      : null
  }
}
