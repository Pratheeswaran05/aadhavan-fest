import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private apiUrl = 'http://localhost:5000/api/videos'; // Change if needed

  constructor(private http: HttpClient) {}

  // uploadVideo(formData: FormData): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/upload`, formData);
  // }

  // uploadVideo(formData: FormData): Observable<any> {
  //   const token = localStorage.getItem('token'); // Or wherever you store the token

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });

  //   return this.http.post(`${this.apiUrl}/upload`, formData, { headers });
  // }

  uploadVideo(formData: FormData) {
    return this.http.post<any>('http://localhost:5000/api/videos/upload', formData);
  }
  
}
