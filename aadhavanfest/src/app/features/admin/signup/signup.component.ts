import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/api.service';

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

  constructor(private apiService: ApiService, private toastr: ToastrService) {}

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
  
    this.apiService.registerAdmin(formData).subscribe(
      response => {
        console.log("Signup Success:", response);
        this.toastr.success('Signup Successful');
      },
      error => {
        console.error("Signup Error:", error);
        this.toastr.error('Signup Failed');
      }
    );
  }
}