import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/admin';


  constructor(private http: HttpClient, private router: Router) {
    
  }

  // login(credentials: { email: string; password: string }): Observable<any> {
  //   return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
  //     catchError(error => {
  //       console.error('Login error:', error);
  //       return throwError(() => new Error(error.message || 'Login failed'));
  //     })
  //   );
  // }
  login(credentials: { email: string; password: string }): Observable<any> {
    console.log('Attempting login with:', credentials); // Log credentials (excluding password)
    
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      map(response => {
        console.log('Login successful, received token:', response.token); // Log response token
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

  // getToken(): string | null {
  //   return localStorage.getItem('adminToken');
  // }

  isLoggedIn(): boolean {
    const token = this.getToken();
    // console.log("AuthService: Checking login state. Token:", token);
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';   
  }

  getToken(): string | null {
    return localStorage.getItem('adminToken');
  }

//   getAdminName(): Observable<string> {
//     const token = this.getToken();
//     if (!token) {
//       return throwError(() => new Error('No token found'));
//     }

//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

//     return this.http.get<{ success: boolean; admin: { email: string } }>(
//       `${this.apiUrl}/me`, { headers }
//     ).pipe(
//       map((response) => response.admin.email), // ✅ Fix map import issue
//       catchError(error => {
//         console.error('Failed to fetch admin name:', error);
//         return throwError(() => new Error(error.message || 'Failed to fetch admin name'));
//       })
//     );
//   }
// }

getAdminName(): Observable<string> {
  const token = this.getToken();
  if (!token) {
    console.error('No token found in localStorage');
    return throwError(() => new Error('No token found'));
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  console.log('Fetching admin name with token:', token);

  return this.http.get<{ success: boolean; admin: { name: string } }>(
    `${this.apiUrl}/me`, { headers }
  ).pipe(
    map(response => {
      console.log('Fetched admin profile:', response.admin.name);
      return response.admin.name;
    }),
    catchError(error => {
      console.error('Failed to fetch admin name:', error);
      return throwError(() => new Error(error.message || 'Failed to fetch admin name'));
    })
  );
}
}