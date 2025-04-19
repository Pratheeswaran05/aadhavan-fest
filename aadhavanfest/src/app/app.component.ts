import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aadhavanfest';
  isAuthPage = false;
  isLoading = true;

  constructor(public router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkAuthPage();

        // after each navigation, hide loader
        setTimeout(() => {
          this.isLoading = false;
        }, 500); // 0.5s delay after route change (feels smoother)
      }
    });

    this.checkAuthPage(); // Check route on refresh
  }

  checkAuthPage() {
    const authRoutes = ['/admin/login', '/admin/signup'];
    this.isAuthPage = authRoutes.includes(this.router.url);
  }
  
  getVideoUrl(video: any): string {
    return `${environment.apiBaseUrl}/${video.video_url}`;
  }
}
