import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {  // Call the function properly
      return true; // Allow access if logged in
    } else {
      if (state.url === '/admin/login') {
        return true; // Allow access to login page
      }
      this.router.navigate(['/admin/login']); // Redirect to login if not logged in
      return false;
    }
  }
}
