import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-highlights',
  standalone: false,
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.css'] // corrected here
})
export class HighlightsComponent implements OnInit {

  selectedTab: 'inside' | 'outside' = 'inside';
  videosInside: any[] = [];
  videosOutside: any[] = [];
  currentVideo: any = null; // Selected video to display in a larger view


  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const tab = params.get('tab') as 'inside' | 'outside';
      if (tab === 'inside' || tab === 'outside') {
        this.selectedTab = tab;
      }
      this.fetchVideos(this.selectedTab);
    });
  }
  
  playVideo(video: any) {
    video.isPlaying = true; // Set the video to play
  }

  // Optionally, you can also create a method to stop the video
  pauseVideo(video: any) {
    video.isPlaying = false; // Set the video to pause
  }

  selectTab(tab: 'inside' | 'outside') {
    this.selectedTab = tab;
    this.fetchVideos(tab);
  }

  // fetchVideos(tab: 'inside' | 'outside') {
  //   const subcategory = tab === 'inside' ? 'Inside College' : 'Outside College';
    
  //   // Use getVideosBySubcategory instead of getHighlights
  //   this.apiService.getVideosBySubcategory(subcategory).subscribe(
  //     (videos: any[]) => {
  //       console.log('Fetched videos:', videos);
  //      if (tab === 'inside') {
  //         this.videosInside = videos;
  //       } else {
  //         this.videosOutside = videos;
  //       }
  //     },
  //     (error: any) => {  // Explicitly typing error as 'any'
  //       console.error('Error fetching videos:', error);
  //       this.toastr.error('Failed to fetch videos. Please try again later.');
  //     }
  //   );
  // }

  // fetchVideos(tab: 'inside' | 'outside') {
  //   const subcategory = tab === 'inside' ? 'Inside College' : 'Outside College';
    
  //   // Use getVideosBySubcategory instead of getHighlights
  //   this.apiService.getVideosBySubcategory(subcategory).subscribe(
  //     (videos: any[]) => {
  //       console.log('Fetched videos:', videos);
  
  //       // Loop through videos and log their thumbnail URLs
  //       videos.forEach(video => {
  //         console.log(video.thumbnail_url); // Log the thumbnail URL for debugging
  //       });

  //       // Clean up the thumbnail_url for each video
  //     videos.forEach(video => {
  //       // Check and clean the thumbnail URL
  //       if (video.thumbnail_url) {
  //         video.thumbnail_url = video.thumbnail_url.replace('/uploads/uploads', '/uploads');
  //       }
  //     });
  
  //       if (tab === 'inside') {
  //         this.videosInside = videos;
  //       } else {
  //         this.videosOutside = videos;
  //       }
  //     },
  //     (error: any) => {  // Explicitly typing error as 'any'
  //       console.error('Error fetching videos:', error);
  //       this.toastr.error('Failed to fetch videos. Please try again later.');
  //     }
  //   );
  // }

  fetchVideos(tab: 'inside' | 'outside') {
    const subcategory = tab === 'inside' ? 'Inside College' : 'Outside College';
  
    this.apiService.getVideosBySubcategory(subcategory).subscribe(
      (videos: any[]) => {
        console.log('Fetched videos:', videos);
  
        // Loop through videos and clean thumbnail URLs
        videos.forEach(video => {
          if (video.thumbnail_url) {
            // Fix duplicate '/uploads/uploads'
            const cleanedPath = video.thumbnail_url.replace('/uploads/uploads', '/uploads');
  
            // Add backend server URL in front
            video.thumbnail_url = `http://localhost:5000${cleanedPath}`;
          }
        });
  
        if (tab === 'inside') {
          this.videosInside = videos;
        } else {
          this.videosOutside = videos;
        }
      },
      (error: any) => {
        console.error('Error fetching videos:', error);
        this.toastr.error('Failed to fetch videos. Please try again later.');
      }
    );
  }
  

  
  playAndUnmute(video: HTMLVideoElement) {
    video.muted = false;
    video.play().catch(err => {
      console.error('Play error:', err);
    });
  }

  pauseAndMute(video: HTMLVideoElement) {
    video.pause();
    video.muted = true;
  }

// Select a video to display it in full-screen view
openVideoInNewTab(video: any) {
  this.currentVideo = video;
}

  // Navigate to the next video
  nextVideo() {
    const videoList = this.selectedTab === 'inside' ? this.videosInside : this.videosOutside;
    const currentIndex = videoList.indexOf(this.currentVideo);

    // If not the last video in the list, set the next video
    if (currentIndex < videoList.length - 1) {
      this.currentVideo = videoList[currentIndex + 1];
    }
  }

  // Navigate to the previous video
  prevVideo() {
    const videoList = this.selectedTab === 'inside' ? this.videosInside : this.videosOutside;
    const currentIndex = videoList.indexOf(this.currentVideo);

    // If not the first video in the list, set the previous video
    if (currentIndex > 0) {
      this.currentVideo = videoList[currentIndex - 1];
    }
  }




  shareVideo(video: any) {
    const url = `${window.location.origin}/videos/${video.id}`
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: url,
      }).catch(err => console.error('Sharing failed:', err));
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert('Video link copied!');
      }).catch(() => alert('Copy failed'));
    }
  }
}