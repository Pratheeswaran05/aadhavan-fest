import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/api.service';

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

  selectedVideos: File[] = [];
  selectedThumbnails: File[] = [];
  title: string = '';
  description: string = '';
  category: string = '';
  isUploading = false;


  constructor(private authService: AuthService, private router: Router, private apiService: ApiService) {}

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

// Handle video selection
onVideoChange(event: any) {
  this.selectedVideos = Array.from(event.target.files);
}

// Handle thumbnail selection
onThumbnailChange(event: any) {
  this.selectedThumbnails = Array.from(event.target.files);
}

// Upload videos & thumbnails
// Upload videos & thumbnails
uploadVideos() {
  if (this.selectedVideos.length === 0 || this.selectedThumbnails.length === 0 || !this.title || !this.category) {
    alert('Please fill all required fields and select both videos and thumbnails.');
    return;
  }

  this.isUploading = true;
  const formData = new FormData();

  // Append form data
  formData.append('title', this.title);
  formData.append('description', this.description);
  formData.append('category', this.category);
  this.selectedVideos.forEach((file) => formData.append('videos', file));
  this.selectedThumbnails.forEach((file) => formData.append('thumbnails', file));

  // API Call
  this.apiService.uploadVideos(formData).subscribe({
    next: (res) => {
      alert('Videos uploaded successfully!');
      this.isUploading = false;
      this.selectedVideos = [];
      this.selectedThumbnails = [];
      this.title = '';
      this.description = '';
      this.category = '';
    },
    error: (err) => {
      console.error('Upload failed:', err);
      alert('Upload failed.');
      this.isUploading = false;
    }
  });
 }
}
