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

  isSidebarOpen: boolean = true;
  selectedMenu: string = 'overview';
  adminName: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  // ngOnInit(): void {
  //   this.authService.getAdmin().subscribe({
  //     // next: (data: string) => {
  //     //   this.adminName = data;
  //     next: (name) => {
  //       this.adminName = name;  // Store admin name
  //       console.log('Admin Name:', this.adminName);
  //     },
  //     error: (error: Error) => {
  //       console.error('Error fetching admin name:', error.message);
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.authService.getAdmin().subscribe({
      next: (admin) => {
        this.adminName = admin.name;  // <-- FIX HERE
        console.log('Admin Name:', this.adminName);
      },
      error: (error: Error) => {
        console.error('Failed to fetch admin:', error.message);
        this.authService.clearSession();    // remove bad token
        this.router.navigate(['/admin/login']); // move to login
      
      }
    });
  }


  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  selectMenu(menu: string) {
    this.selectedMenu = menu;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('adminName'); // remove stored admin name too
    this.router.navigate(['/admin/login']);
  }
}
