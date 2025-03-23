import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../core/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  selectedRole: string = '';  // Stores the selected role
  name: string = '';
  email: string = '';
  roleId: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;

  // Role Labels and Placeholders
  roleLabels: { [key: string]: string } = { 
    teaching: 'Teacher ID', 
    'non-teaching': 'Staff ID', 
    student: 'Student ID' 
  };

  rolePlaceholders: { [key: string]: string } = { 
    teaching: 'Enter your Teacher ID', 
    'non-teaching': 'Enter your Staff ID', 
    student: 'Enter your Student ID' 
  };

  private apiUrl = 'http://localhost:5000/api/admin/register';

  constructor(
    private apiService: ApiService, 
    private toastr: ToastrService, 
    private router: Router) {}

  get roleLabel(): string { 
    return this.roleLabels[this.selectedRole] || 'ID'; 
  }

  get rolePlaceholder(): string { 
    return this.rolePlaceholders[this.selectedRole] || 'Enter your ID'; 
  }

  // Show/Hide Password
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Handle Form Submission
  register() {
    if (this.password !== this.confirmPassword) {
      this.toastr.error('Passwords do not match!', 'Error');
      return;
    }

    const adminData = {
      name: this.name,
      email: this.email,
      role: this.selectedRole,
      roleId: this.roleId,
      password: this.password
    };

   
    this.apiService.registerAdmin(adminData).subscribe({
      next: (response) => {
        console.log("Registration Successful:", response);
        this.toastr.success('Account created successfully!', 'Success');
        this.router.navigate(['/admin/login']);
      },
      error: (error) => {
        console.error("Error:", error);
        this.toastr.error(error.error.message || "Error registering. Please try again.", 'Error');
      }
    });
  }
}