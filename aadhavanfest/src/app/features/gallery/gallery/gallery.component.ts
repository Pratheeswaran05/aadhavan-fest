import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  categories = ['all', 'events', 'sports', 'cultural'];
  selectedCategory = 'all';

  images = [
    { src: 'https://source.unsplash.com/random/300x400?event', category: 'events' },
    { src: 'https://source.unsplash.com/random/400x500?sports', category: 'sports' },
    { src: 'https://source.unsplash.com/random/500x600?culture', category: 'cultural' },
    { src: 'https://source.unsplash.com/random/600x400?festival', category: 'events' },
  ];

  filteredImages = [...this.images];

  lightboxOpen = false;
  lightboxImage = '';

  filterGallery(category: string) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredImages = [...this.images];
    } else {
      this.filteredImages = this.images.filter(img => img.category === category);
    }
  }

  loadMoreImages() {
    for (let i = 0; i < 4; i++) {
      const randomCategory = ['events', 'sports', 'cultural'][Math.floor(Math.random() * 3)];
      const newImage = {
        src: `https://source.unsplash.com/random?sig=${Math.random()}`,
        category: randomCategory
      };
      this.images.push(newImage);
    }
    this.filterGallery(this.selectedCategory); // To update filtered view
  }

  openLightbox(src: string) {
    this.lightboxImage = src;
    this.lightboxOpen = true;
  }

  closeLightbox() {
    this.lightboxOpen = false;
  }

}
