import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  isSidebarOpen = true;
  adminName: string = '';
  selectedMenu: string = 'overview'; // default tab

  constructor(private authService: AuthService, private router: Router) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  selectMenu(menu: string) {
    this.selectedMenu = menu;
  }
  

  ngOnInit(): void {
    this.authService.getAdminName().subscribe({
      // next: (data: string) => {
      //   this.adminName = data;
      next: (name) => {
        this.adminName = name;  // ✅ Store admin name
        console.log('Admin Name:', this.adminName);
      },
      error: (error: Error) => {
        console.error('Error fetching admin name:', error.message);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    // this.router.navigate(['/admin/login']); // Ensure redirection after logout
  }

}
