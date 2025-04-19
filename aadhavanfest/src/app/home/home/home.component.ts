import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('introVideo') introVideo!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const videoElement = this.introVideo.nativeElement;

    // Ensure the video is muted
    videoElement.muted = true;

    // Check and ensure autoplay is functioning properly
    if (videoElement.autoplay && videoElement.paused) {
      videoElement.play();
    }
  }
}
