import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  // console.log("AuthGuard: Checking if user is logged in...");

  if (this.authService.isLoggedIn()) {
    // console.log("AuthGuard: User is logged in. Access granted.");
    return true;
  } else {
    // console.log("AuthGuard: User is NOT logged in. Redirecting to login...");
    this.router.navigate(['/admin/login']);
    return false;
  }
}
}