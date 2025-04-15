import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-highlights',
  standalone: false,
  templateUrl: './highlights.component.html',
  styleUrl: './highlights.component.css'
})
export class HighlightsComponent implements OnInit {

  selectedTab: 'inside' | 'outside' = 'inside'; // default value
  videosInside: any[] = []; // Store videos for inside tab
  videosOutside: any[] = []; // Store videos for outside tab

  isDesktop(): boolean {
    return window.innerWidth >= 1024;  // Adjust this based on your definition of "desktop"
  }
  toggleMute(videoElement: HTMLVideoElement) {
    videoElement.muted = !videoElement.muted;
  }
  playAndUnmute(videoElement: HTMLVideoElement) {
    videoElement.muted = false;
    videoElement.play();
  }
  
  pauseAndMute(videoElement: HTMLVideoElement) {
    videoElement.pause();
    videoElement.muted = true;
  }
  
  

  constructor(private route: ActivatedRoute, private apiService: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    // Fetch tab from URL params to set selectedTab
    this.route.paramMap.subscribe(params => {
      const tab = params.get('tab') as 'inside' | 'outside';
      if (tab === 'inside' || tab === 'outside') {
        this.selectedTab = tab;
      }
      this.fetchVideos(this.selectedTab); // Fetch videos when component is initialized
    });
  }

  selectTab(tab: 'inside' | 'outside') {
    this.selectedTab = tab;
    this.fetchVideos(tab); // Fetch videos when the tab is selected
  }

  // fetchVideos(tab: 'inside' | 'outside') {
  //   const subcategory = tab === 'inside' ? 'inside_college' : 'outside_college';
    
  //   this.apiService.getHighlights(subcategory).subscribe(
  //     (videos: any[]) => {
  //       if (tab === 'inside') {
  //         this.videosInside = videos;
  //       } else {
  //         this.videosOutside = videos;
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching videos:', error);
  //     }
  //   );
  // }

  fetchVideos(tab: 'inside' | 'outside') {
    const subcategory = tab === 'inside' ? 'inside_college' : 'outside_college';
    
    this.apiService.getHighlights(subcategory).subscribe(
      (videos: any[]) => {
        console.log('Fetched videos:', videos);
        if (tab === 'inside') {
          this.videosInside = videos;
        } else {
          this.videosOutside = videos;
        }
      },
      (error) => {
        console.error('Error fetching videos:', error);
        // Optionally, display a user-friendly error message in the UI
        this.toastr.error('Failed to fetch videos. Please try again later.');
      }
    );
  }

  
  shareVideo(video: any) {
    const url = `${window.location.origin}/videos/${video.id}`;
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