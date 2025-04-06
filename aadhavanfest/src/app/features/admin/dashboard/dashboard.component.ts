import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  {

  // isSidebarOpen = true;
  // adminName: string = '';
  // selectedMenu: string = 'overview'; // default tab
  isSidebarOpen = true;
  selectedMenu = 'overview'; // default selected
  adminName = 'Admin'; // load your admin name here

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  selectMenu(menu: string) {
    this.selectedMenu = menu;
  }

  logout() {
    // Remove token from localStorage or sessionStorage
  localStorage.removeItem('token'); 
  sessionStorage.removeItem('token'); // (if you stored it in sessionStorage)

  // (Optional) If you have any user info stored
  localStorage.removeItem('user');
  
  // Redirect to login page
  window.location.href = '/admin/login'; 
  }
}