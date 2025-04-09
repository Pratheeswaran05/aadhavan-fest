import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private apiUrl = 'http://localhost:5000/api/videos'; // Change if needed

  constructor(private http: HttpClient) {}


  uploadVideo(formData: FormData) {
    return this.http.post<any>('http://localhost:5000/api/videos/upload', formData);
  }
  
}
