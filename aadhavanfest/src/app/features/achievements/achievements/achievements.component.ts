import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-achievements',
  standalone: false,
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  selectedTab: 'district' | 'state' | 'national' = 'district';

  // Define separate arrays for videos
  districtVideos: any[] = [];
  stateVideos: any[] = [];
  nationalVideos: any[] = [];


  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {}


  ngOnInit(): void {
    // Subscribe to route parameters to capture the selected tab
    this.route.params.subscribe(params => {
      const tab = params['tab'];
      if (tab) {
        this.selectedTab = tab;
      }
      this.fetchVideos(this.selectedTab); // Fetch videos on init based on the selected tab
    });
  }

  // Select the tab (district, state, or national)
  selectTab(tab: 'district' | 'state' | 'national') {
    this.selectedTab = tab;
    this.fetchVideos(tab); // Fetch videos for the selected tab
  }

  // Fetch videos based on the selected tab
  // fetchVideos(tab: 'district' | 'state' | 'national') {
  //   this.apiService.getAchievements('Achievements', tab).subscribe(
  //     (videos: any[]) => {
  //       console.log('Fetched videos:', videos);
  //       if (tab === 'district') {
  //         this.districtVideos = videos;
  //       } else if (tab === 'state') {
  //         this.stateVideos = videos;
  //       } else if (tab === 'national') {
  //         this.nationalVideos = videos;
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching videos:', error);
  //       this.toastr.error('Failed to fetch videos. Please try again later.');
  //     }
  //   );
  // }
  fetchVideos(tab: 'district' | 'state' | 'national') {
    this.apiService.getAchievements(tab).subscribe(
      (videos: any[]) => {
        console.log('Fetched videos:', videos);
        if (tab === 'district') {
          this.districtVideos = videos;
        } else if (tab === 'state') {
          this.stateVideos = videos;
        } else if (tab === 'national') {
          this.nationalVideos = videos;
        }
      },
      (error) => {
        console.error('Error fetching videos:', error);
        this.toastr.error('Failed to fetch videos. Please try again later.');
      }
    );
  }
  

  // Play and unmute video
  playAndUnmute(video: HTMLVideoElement) {
    video.muted = false;
    video.play().catch(err => {
      console.error('Play error:', err);
    });
  }

  // Pause and mute video
  pauseAndMute(video: HTMLVideoElement) {
    video.pause();
    video.muted = true;
  }

  // Share video functionality
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