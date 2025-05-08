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
  videoId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

//   ngOnInit(): void {
//     // Get video ID from the route parameters
//     const videoId = this.route.snapshot.paramMap.get('id');
    
//     if (videoId) {
//       // Fetch the video details by ID
//       // this.apiService.getVideoById(videoId).subscribe(
//       //   (video) => {
//       //     // prepend the backend URL if it's not already full
//       //     if (video.video_url && !video.video_url.startsWith('http')) {
//       //       video.video_url = `http://localhost:5000${video.video_url}`;
//       //     }
      
//       //     this.video = video;
//       //   },
//       //   (error) => {
//       //     console.error('Error fetching video:', error);
//       //   }
//       // );
//       this.apiService.getVideoById(videoId).subscribe((video) => {
//         console.log('Video ID:', video.video_id);              // Should not be undefined
//         console.log('Video URL:', video.video_url);            // Should be something like /uploads/xyz.mp4
      
//         if (video.video_url && !video.video_url.startsWith('http')) {
//           video.video_url = 'http://localhost:5000' + video.video_url;
//         }
      
//         this.video = video;
//       });
      
      
//     }
//   }
// }

ngOnInit(): void {
  // Subscribe to route parameters
  this.route.params.subscribe(params => {
    this.videoId = params['id']; // Get video ID from route parameters
    console.log('Video ID:', this.videoId);
    if (this.videoId) {
      this.fetchVideoDetails(this.videoId); // Fetch video details by ID
    } else {
      console.error('Video ID is missing in route parameters');
    }
  });
}

fetchVideoDetails(videoId: string): void {
  // Fetch the video details from your API
  this.apiService.getVideoById(videoId).subscribe((video) => {
    console.log('Video ID:', video.video_id);  // Should be the ID of the video
    console.log('Video URL:', video.video_url);  // Should be the video URL, e.g., /uploads/xyz.mp4

    // Check if the video URL is relative and convert it to an absolute URL
    if (video.video_url && !video.video_url.startsWith('http')) {
      video.video_url = `http://localhost:5000${video.video_url}`;
    }

    // Store the video details
    this.video = video;
  }, (error) => {
    console.error('Error fetching video:', error);
  });
}
}