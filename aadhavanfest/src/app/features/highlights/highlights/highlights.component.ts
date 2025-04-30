import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router, 
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

  openVideoInNewTab(video: any) {
    this.router.navigate(['/video', video.id]);
  }

  playVideo(video: any) {
    video.isPlaying = true;
  }

  pauseVideo(video: any) {
    video.isPlaying = false;
  }

  playAndUnmute(video: HTMLVideoElement) {
    if (!video.muted) {
      video.muted = true;
    }
    if (video.paused) {
      video.play().catch((err) => {
        console.warn('Autoplay failed', err);
      });
    }
  }

  pauseAndMute(video: HTMLVideoElement) {
    if (!video.paused) {
      video.pause();
      video.currentTime = 0;
    }
  }

  selectTab(tab: 'inside' | 'outside') {
    this.selectedTab = tab;
    this.fetchVideos(tab);
  }

  fetchVideos(tab: 'inside' | 'outside') {
    const subcategory = tab === 'inside' ? 'Inside College' : 'Outside College';

    this.apiService.getVideosBySubcategory(subcategory).subscribe(
      (videos: any[]) => {
        console.log('Fetched videos:', videos);

        videos.forEach(video => {
          if (video.thumbnail_url) {
            // console.log('Original thumbnail_url:', video.thumbnail_url);

            let cleanedPath = video.thumbnail_url
              .replace(/\\/g, '/')
              .replace('/uploads/uploads', '/uploads');

            if (!cleanedPath.startsWith('/')) {
              cleanedPath = '/' + cleanedPath;
            }

            // console.log('Cleaned thumbnail path:', cleanedPath);
            video.thumbnail_url = `http://localhost:5000${cleanedPath}`;
            // console.log('Final thumbnail URL:', video.thumbnail_url);
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