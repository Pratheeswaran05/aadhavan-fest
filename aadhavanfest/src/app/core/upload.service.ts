import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private apiUrl = 'http://localhost:5000/api/videos';

  // render url
  // private apiUrl = 'https://af-backend-0ab0.onrender.com/api/videos';

  constructor(private http: HttpClient) {}


  uploadVideo(formData: FormData) {
    return this.http.post<any>('http://localhost:5000/api/videos/upload', formData);
    // return this.http.post<any>('https://af-backend-0ab0.onrender.com//api/videos/upload', formData);

  }
  
}
