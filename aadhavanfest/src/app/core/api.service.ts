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

  getHighlights(category: string, subcategory: string) {
    // return this.http.get<any[]>(`${this.apiUrl}/highlights?category=${category}&subcategory=${subcategory}`);
    return this.http.get<Video[]>(`${this.baseUrl}/videos/highlights?category=${category}&subcategory=${subcategory}`).pipe(
      catchError(this.handleError)
    );
   }


  getAchievements(subcategory: string) {
    return this.http.get<Video[]>(`${this.baseUrl}/videos/achievements/${subcategory}`).pipe(
      catchError(this.handleError)
    );
  }
  
  
  getAllGalleryVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.baseUrl}/videos/all`).pipe(
      catchError(this.handleError)
    );
  }
  
  // getAllGalleryPhotos(): Observable<{ photo_id: number, image_url: string }[]> {
  //   return this.http.get<{ photo_id: number, image_url: string }[]>(`${this.baseUrl}/photos/all`).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  // getAllGalleryPhotos(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/photos/all`).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  getAllGalleryPhotos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/photos/`).pipe(  // Using `/photos/` route now
      catchError(this.handleError)
    );
  }
  
  

// Fetch videos by subcategory with error handling
getVideosBySubcategory(subcategory: string): Observable<Video[]> {
  return this.http.get<Video[]>(`${this.baseUrl}/videos/highlights/${subcategory}`).pipe(
    catchError(this.handleError) // Add error handling
  );
}

  // Generic error handler
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);  // Log the error
    throw new Error('Something went wrong while fetching videos. Please try again later.');
  }
}
