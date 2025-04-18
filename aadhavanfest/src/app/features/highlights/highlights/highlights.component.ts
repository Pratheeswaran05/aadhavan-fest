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
  

  selectTab(tab: 'inside' | 'outside') {
    this.selectedTab = tab;
    this.fetchVideos(tab);
  }

  fetchVideos(tab: 'inside' | 'outside') {
    const subcategory = tab === 'inside' ? 'Inside College' : 'Outside College';
    
    // Use getVideosBySubcategory instead of getHighlights
    this.apiService.getVideosBySubcategory(subcategory).subscribe(
      (videos: any[]) => {
        console.log('Fetched videos:', videos);
        if (tab === 'inside') {
          this.videosInside = videos;
        } else {
          this.videosOutside = videos;
        }
      },
      (error: any) => {  // Explicitly typing error as 'any'
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