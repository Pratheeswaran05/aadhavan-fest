import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-videoplayer',
  standalone: false,
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.css'
})
export class VideoplayerComponent  implements OnInit {

  video: any; // Will store the current video details

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // Get video ID from the route parameters
    const videoId = this.route.snapshot.paramMap.get('id');
    
    if (videoId) {
      // Fetch the video details by ID
      this.apiService.getVideoById(videoId).subscribe(
        (video) => {
          this.video = video;
        },
        (error) => {
          console.error('Error fetching video:', error);
        }
      );
    }
  }
}
