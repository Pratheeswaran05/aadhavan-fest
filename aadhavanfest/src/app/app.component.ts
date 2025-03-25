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

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(() => {
      this.checkAuthPage();
    });
    this.checkAuthPage(); // Check route on refresh
  }

  checkAuthPage() {
    const authRoutes = ['/admin/login', '/admin/signup'];
    this.isAuthPage = authRoutes.includes(this.router.url);
  }
}