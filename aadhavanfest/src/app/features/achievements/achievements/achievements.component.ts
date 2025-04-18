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
  videosDistrict: any[] = [];
  videosState: any[] = [];
  videosNational: any[] = [];

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const tab = params.get('tab') as 'district' | 'state' | 'national';
      if (tab === 'district' || tab === 'state' || tab === 'national') {
        this.selectedTab = tab;
      }
      this.fetchVideos(this.selectedTab);
    });
  }

  selectTab(tab: 'district' | 'state' | 'national') {
    this.selectedTab = tab;
    this.fetchVideos(tab);
  }

  fetchVideos(tab: 'district' | 'state' | 'national') {
    const subcategory = tab.charAt(0).toUpperCase() + tab.slice(1); // Capitalize

    this.apiService.getAchievements(subcategory).subscribe(
      (videos: any[]) => {
        console.log('Fetched videos:', videos);
        if (tab === 'district') {
          this.videosDistrict = videos;
        } else if (tab === 'state') {
          this.videosState = videos;
        } else if (tab === 'national') {
          this.videosNational = videos;
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