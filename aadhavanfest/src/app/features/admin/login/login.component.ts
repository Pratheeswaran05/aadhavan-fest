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

  showPassword: boolean = false; // Track password visibility
  email = '';
  password = '';
  isLoading: boolean = false; // Track loading state for preloader


  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService 
  ) {}


  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.isLoading = true; // Start loading (show preloader)

    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        this.toastr.success('Login successful!', 'Welcome Admin');
        this.router.navigate(['/admin/dashboard']);
        this.isLoading = false; // Stop loading (hide preloader)
      },
      (error) => {
        this.toastr.error('Invalid credentials', 'Login Failed');
        this.isLoading = false; // Stop loading (hide preloader)
      }
    );
  }
}
