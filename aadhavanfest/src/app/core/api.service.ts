import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define the Video interface
export interface Video {
  video_id: number;
  admin_id: number;
  title: string;
  description: string;
  categories: string[]; // or string if stored as a single value
  subcategories: { [key: string]: string } | null;
  video_url: string;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
  // duration?: string; // optional if backend supports it
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Fetch highlight videos based on subcategory
  getHighlights(subcategory: string): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.baseUrl}/videos/highlights/${subcategory}`).pipe(
      catchError(this.handleError) // Add error handling
    );
  }

  // Optionally, fetch all videos or other categories later
  getAllVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.baseUrl}/videos`).pipe(
      catchError(this.handleError)
    );
  }

  getVideosByCategory(category: string): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.baseUrl}/videos/category/${category}`).pipe(
      catchError(this.handleError)
    );
  }

  // Generic error handler
  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
