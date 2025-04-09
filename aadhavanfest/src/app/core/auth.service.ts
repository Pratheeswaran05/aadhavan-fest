import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/admin';


  constructor(private http: HttpClient, private router: Router) {  }

  // login(credentials: { email: string; password: string }): Observable<any> {
  //   console.log('Attempting login with:', credentials); // Log credentials (excluding password)
    
  //   return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
  //     map(response => {
  //       console.log('Login successful, received token:', response.token); // Log response token
  //       return response;
  //     }),
  //     catchError(error => {
  //       console.error('Login error:', error);
  //       return throwError(() => new Error(error.message || 'Login failed'));
  //     })
  //   );
  // }

  // login(credentials: { email: string; password: string }): Observable<any> {
  //   console.log('Attempting login with:', credentials);
    
  //   return this.http.post<{ token: string; admin: { id: number; name: string; email: string } }>(
  //     `${this.apiUrl}/login`, 
  //     credentials
  //   ).pipe(
  //     map(response => {
  //       console.log('Login successful, received token:', response.token);
  
  //       // Save token
  //       localStorage.setItem('adminToken', response.token);
  
  //       // Save admin details
  //       localStorage.setItem('admin', JSON.stringify(response.admin));
  
  //       return response;
  //     }),
  //     catchError(error => {
  //       console.error('Login error:', error);
  //       return throwError(() => new Error(error.message || 'Login failed'));
  //     })
  //   );
  // }
  
 
  login(credentials: { email: string; password: string }): Observable<any> {
    console.log('Attempting login with:', credentials);
    
    return this.http.post<{ token: string; admin: { id: number; name: string; email: string } }>(
      `${this.apiUrl}/login`, 
      credentials
    ).pipe(
      map(response => {
        console.log('Login successful, received token:', response.token);
  
        // Save token and admin once
        localStorage.setItem('adminToken', response.token);
        localStorage.setItem('admin', JSON.stringify(response.admin));
  
        return response;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error(error.message || 'Login failed'));
      })
    );
  }
  
  
  setToken(token: string): void {
    localStorage.setItem('adminToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('adminToken');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout(): void {
    this.clearSession();
    window.location.href = '/admin/login';
  }

  // getAdmin(): Observable<string> {
  //   const token = this.getToken();
  //   if (!token) {
  //     console.error('No token found in localStorage');
  //     return throwError(() => new Error('No token found'));
  //   }

  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   console.log('Fetching admin profile with token:', token);

  //   return this.http.get<{ id: number; name: string; email: string }>(
  //     `${this.apiUrl}/profile`, { headers }
  //   ).pipe(
  //     map(response => {
  //       console.log('Fetched admin profile:', response.name);
  //       return response.name;
  //     }),
  //     catchError(error => {
  //       console.error('Failed to fetch admin name:', error);
  //       return throwError(() => new Error(error.message || 'Failed to fetch admin name'));
  //     })
  //   );
  // }


  getAdmin(): Observable<{ id: number; name: string; email: string }> {
    const token = this.getToken();
    if (!token) {
      console.error('No token found in localStorage');
      return throwError(() => new Error('No token found'));
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Fetching admin profile with token:', token);
  
    return this.http.get<{ id: number; name: string; email: string }>(
      `${this.apiUrl}/profile`, { headers }
    ).pipe(
      map(response => {
        console.log('Fetched admin profile:', response);
        return response; // return full object { id, name, email }
      }),
      catchError(error => {
        console.error('Failed to fetch admin profile:', error);
        return throwError(() => new Error(error.message || 'Failed to fetch admin profile'));
      })
    );
  }

  
  setAdmin(admin: any): void {
    localStorage.setItem('admin', JSON.stringify(admin));
  }

  getAdminData() {
    const adminData = localStorage.getItem('admin');
    if (adminData) {
      return JSON.parse(adminData);
    }
    return null;
  }

  clearSession(): void {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
  }
}