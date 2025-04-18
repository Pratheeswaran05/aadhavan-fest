import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  standalone: false,
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class IntroComponent implements OnInit{
  videoPlayed: boolean = false;

  ngOnInit(): void {
    // Check if the user has already watched the intro video
    if (localStorage.getItem('introVideoPlayed') === 'true') {
      this.videoPlayed = true;
    }
  }

  onVideoEnd(): void {
    // Mark the video as watched
    localStorage.setItem('introVideoPlayed', 'true');
    this.videoPlayed = true;
  }

}
