import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api/admin';

  constructor(private http: HttpClient) {}

  // registerAdmin(adminData: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/register`, adminData);
  // }
  registerAdmin(adminData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, adminData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  
}

