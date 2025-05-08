import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-overview',
  standalone: false,
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit {
  totalVideos: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTotalVideos().subscribe({
      next: (data) => {
        this.totalVideos = data.totalVideos;
      },
      error: (err) => {
        console.error('Failed to load total videos:', err);
      }
    });
  }
}