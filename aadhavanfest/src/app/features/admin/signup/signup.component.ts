import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  name: string = '';
  email: string = '';
  selectedRole: string = 'student';
  roleId: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;

  // Dynamic labels and placeholders
  roleLabel: string = 'Student ID';
  rolePlaceholder: string = 'Enter your Student ID';

  constructor() {}

  // Form submit method
  register() {
    console.log('Registering:', {
      name: this.name,
      email: this.email,
      role: this.selectedRole,
      roleId: this.roleId,
      password: this.password,
    });
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

