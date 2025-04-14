import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  selectedRole: string = 'teaching';
  name: string = '';
  email: string = '';
  roleId: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;

  roleData: { [key: string]: { label: string; placeholder: string } } = {
    teaching: { label: 'Teacher ID', placeholder: 'Enter Teacher ID' },
    'non-teaching': { label: 'Staff ID', placeholder: 'Enter Staff ID' },
    student: { label: 'Student ID', placeholder: 'Enter Student ID' }
  };

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {}

  get roleLabel(): string {
    return this.roleData[this.selectedRole]?.label || 'ID';
  }

  get rolePlaceholder(): string {
    return this.roleData[this.selectedRole]?.placeholder || 'Enter ID';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  register() {
    if (this.password !== this.confirmPassword) {
      this.toastr.error('Passwords do not match');
      return;
    }

   
    const formData = {
      name: this.name,
      email: this.email,
      role: this.selectedRole,
      roleId: this.roleId,
      password: this.password
    };
  
    console.log("Submitting Form Data:", formData); // Debugging
  
    this.authService.registerAdmin(formData).subscribe(
      response => {
        console.log("Signup Success:", response);
        this.toastr.success('Signup Successful');
        this.router.navigate(['/admin/login']);

      },
      error => {
        console.error("Signup Error:", error);
        this.toastr.error('Signup Failed');
      }
    );
  }
}