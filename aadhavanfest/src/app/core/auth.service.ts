import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/admin/login';

  constructor(private http: HttpClient) {
    
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }

  setToken(token: string): void {
    localStorage.setItem('adminToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('adminToken');
  }

  
  isLoggedIn(): boolean {
    return !!this.getToken(); // Ensures it returns a boolean
  }
  

  logout(): void {
    localStorage.removeItem('adminToken');
  }
}
