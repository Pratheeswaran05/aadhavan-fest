import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  selectedCategory: string = 'all';
  lightboxOpen = false;
  lightboxImage = '';
  lightboxVideo = '';
  lightboxType = '';
  items: any[] = [];
  filteredItems: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadGalleryItems();
  }

  loadGalleryItems(): void {
    // Reset items array to avoid duplicates
    this.items = [];

    // Fetch video items
    this.apiService.getAllGalleryVideos().subscribe(videos => {
      const videoItems = videos.map(v => ({
        src: `http://localhost:5000/${v.video_url}`,
        type: 'video',
        category: 'video'
      }));
      this.items = [...this.items, ...videoItems];
    });

    // Fetch photo items
    this.apiService.getAllGalleryPhotos().subscribe(photos => {
      const imageItems = photos.map(p => ({
        src: `http://localhost:5000/${p.photo_url}`,
        type: 'image',
        category: p.categories && p.categories.length > 0 ? p.categories[0] : 'image', // check categories array length
        title: p.title,
        description: p.description,
        thumbnail: p.thumbnail_url ? `http://localhost:5000/${p.thumbnail_url}` : null
      }));
      this.items = [...this.items, ...imageItems];
      this.filteredItems = [...this.items]; // Ensure filteredItems is updated as well
    });
  }

  filterGallery(category: string) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredItems = [...this.items];
    } else {
      this.filteredItems = this.items.filter(item => item.category === category);
    }
  }

  openLightbox(src: string) {
    const fileType = src.split('.').pop()?.toLowerCase();
    if (fileType === 'mp4') {
      this.lightboxType = 'video';
      this.lightboxVideo = src;
    } else {
      this.lightboxType = 'image';
      this.lightboxImage = src;
    }
    this.lightboxOpen = true;
  }

  closeLightbox() {
    this.lightboxOpen = false;
  }

  loadMoreItems() {
    // Pagination logic could be added here for more items
    console.log('Load more items clicked');
  }
}
