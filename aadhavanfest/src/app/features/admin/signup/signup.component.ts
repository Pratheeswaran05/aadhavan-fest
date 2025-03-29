import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private authService: AuthService, private toastr: ToastrService) {}

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

    this.authService.registerAdmin(formData).subscribe(
      response => {
        this.toastr.success('Signup Successful');
      },
      error => {
        this.toastr.error('Signup Failed');
      }
    );
  }
}