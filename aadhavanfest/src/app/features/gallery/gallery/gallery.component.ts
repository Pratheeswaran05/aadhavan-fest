import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  // categories = ['all', 'events', 'sports', 'cultural'];
  // selectedCategory = 'all';

  // images = [
  //   { src: 'https://source.unsplash.com/random/300x400?event', category: 'events' },
  //   { src: 'https://source.unsplash.com/random/400x500?sports', category: 'sports' },
  //   { src: 'https://source.unsplash.com/random/500x600?culture', category: 'cultural' },
  //   { src: 'https://source.unsplash.com/random/600x400?festival', category: 'events' },
  // ];

  // filteredImages = [...this.images];

  // lightboxOpen = false;
  // lightboxImage = '';

  // filterGallery(category: string) {
  //   this.selectedCategory = category;
  //   if (category === 'all') {
  //     this.filteredImages = [...this.images];
  //   } else {
  //     this.filteredImages = this.images.filter(img => img.category === category);
  //   }
  // }

  // loadMoreImages() {
  //   for (let i = 0; i < 4; i++) {
  //     const randomCategory = ['events', 'sports', 'cultural'][Math.floor(Math.random() * 3)];
  //     const newImage = {
  //       src: `https://source.unsplash.com/random?sig=${Math.random()}`,
  //       category: randomCategory
  //     };
  //     this.images.push(newImage);
  //   }
  //   this.filterGallery(this.selectedCategory); // To update filtered view
  // }

  // openLightbox(src: string) {
  //   this.lightboxImage = src;
  //   this.lightboxOpen = true;
  // }

  // closeLightbox() {
  //   this.lightboxOpen = false;
  // }

  selectedCategory: string = 'all';
  lightboxOpen: boolean = false;
  lightboxImage: string = '';
  lightboxType: string = ''; // 'image' or 'video'
  lightboxVideo: string = '';
  
  // categories: string[] = ['all', 'nature', 'events', 'sports', 'art'];
  items: any[] = [
    { src: 'assets/images/image1.jpg', category: 'nature', type: 'image' },
    { src: 'assets/videos/video1.mp4', category: 'events', type: 'video' },
    { src: 'assets/images/image2.jpg', category: 'sports', type: 'image' },
    // Add more items here...
  ];
  filteredItems: any[] = [...this.items];

  // Filter gallery items by category
  filterGallery(category: string) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredItems = [...this.items];
    } else {
      this.filteredItems = this.items.filter(item => item.category === category);
    }
  }

  // Open lightbox for image
  openLightbox(src: string) {
    this.lightboxOpen = true;
    const fileType = src.split('.').pop();
    if (fileType === 'mp4') {
      this.lightboxType = 'video';
      this.lightboxVideo = src;
    } else {
      this.lightboxType = 'image';
      this.lightboxImage = src;
    }
  }

  // Close lightbox
  closeLightbox() {
    this.lightboxOpen = false;
  }

  // Load more items
  loadMoreItems() {
    // You can add more logic to load more items dynamically
    console.log('Loading more items...');
  }
}
