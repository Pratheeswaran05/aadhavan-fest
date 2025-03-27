import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  showPassword: boolean = false; // password visibility
  email = '';
  password = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService 
  ) {}


  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    console.log('Logging in with:', this.email, this.password); // Debug

    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        this.toastr.success('Login successful!', 'Welcome Admin');
        this.router.navigate(['/admin/dashboard']);
      },
      (error) => {
        console.error('Login error:', error); // Log error for debugging
        this.toastr.error('Invalid credentials', 'Login Failed');
      }
    );
  }
}
