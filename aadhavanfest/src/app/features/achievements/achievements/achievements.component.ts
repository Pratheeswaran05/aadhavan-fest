import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

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
  isLoading: boolean = false;
  currentPage: number = 1;
  totalPages: number = 1;  // Default value, will be updated based on the total video count

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const tab = params.get('tab') as 'district' | 'state' | 'national';
      if (tab === 'district' || tab === 'state' || tab === 'national') {
        this.selectedTab = tab;
      }
      this.fetchVideos(this.selectedTab, this.currentPage);
    });
  }

  openVideoInNewTab(video: any): void {
    window.open(video.url, '_blank');
  }

  playAndUnmute(videoRef: HTMLVideoElement): void {
    videoRef.play();
    videoRef.muted = false;
  }

  pauseAndMute(videoRef: HTMLVideoElement): void {
    videoRef.pause();
    videoRef.muted = true;
  }

  playVideo(video: any): void {
    video.isPlaying = true;
    if (this.selectedTab === 'district') {
      this.videosDistrict = [...this.videosDistrict];
    } else if (this.selectedTab === 'state') {
      this.videosState = [...this.videosState];
    } else if (this.selectedTab === 'national') {
      this.videosNational = [...this.videosNational];
    }
  }

  selectTab(tab: 'district' | 'state' | 'national') {
    this.selectedTab = tab;
    this.currentPage = 1;  // Reset to the first page when tab is changed
    this.fetchVideos(tab, this.currentPage);
  }

  fetchVideos(tab: 'district' | 'state' | 'national', page: number) {
    const subcategory = tab.charAt(0).toUpperCase() + tab.slice(1);
    this.isLoading = true;

    this.apiService.getAchievements(subcategory, page).subscribe(
      (videos: any[]) => {
        console.log('Fetched videos:', videos);

        videos.forEach(video => {
          if (video.thumbnail_url) {
            let cleanedPath = video.thumbnail_url
              .replace(/\\/g, '/')
              .replace('/uploads/uploads', '/uploads');

            if (!cleanedPath.startsWith('/')) {
              cleanedPath = '/' + cleanedPath;
            }

            video.thumbnail_url = `http://localhost:5000${cleanedPath}`;
          }
        });

        if (tab === 'district') {
          this.videosDistrict = videos;
        } else if (tab === 'state') {
          this.videosState = videos;
        } else if (tab === 'national') {
          this.videosNational = videos;
        }

        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching videos:', error);
        this.toastr.error('Failed to fetch videos. Please try again later.');
        this.isLoading = false;
      }
    );
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchVideos(this.selectedTab, this.currentPage);
    }
  }
}