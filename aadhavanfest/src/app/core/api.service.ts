import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api/admin';

  constructor(private http: HttpClient) {}
  
  registerAdmin(adminData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, adminData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }


  // Upload multiple videos
  uploadVideos(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure admin is authenticated
    });

    return this.http.post(`${this.apiUrl}/videos/upload`, formData, { headers });
  }
  
}

