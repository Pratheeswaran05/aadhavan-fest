import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api/admin'; // Backend API base URL

  constructor(private http: HttpClient) {}

  // Register API Call
  registerAdmin(adminData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, adminData);
  }
}