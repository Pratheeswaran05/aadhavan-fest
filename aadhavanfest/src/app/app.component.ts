import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

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

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
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
}
