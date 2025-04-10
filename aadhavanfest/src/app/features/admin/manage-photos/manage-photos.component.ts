import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoService } from '../../../core/video.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-manage-photos',
  standalone: false,
  templateUrl: './manage-photos.component.html',
  styleUrl: './manage-photos.component.css'
})
export class ManagePhotosComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedFiles: any[] = [];
  imageDescription: string = '';
  selectedCategories: string[] = [];
  selectedSubcategories: { [key: string]: string } = {};

  categories: string[] = ['Highlights', 'Achievements', 'Events', 'Gallery'];

  subcategoriesMap: { [key: string]: string[] } = {
    Highlights: ['Inside College', 'Outside College'],
    Achievements: ['District', 'State', 'National'],
    Events: ['Upcoming Events', 'Past Events'],
    Gallery: ['Photos', 'Videos'],
    College: ['About', 'Facilities', 'Clubs']
  };

    constructor(
      private sanitizer: DomSanitizer,
      private videoService: VideoService,
      private toastr: ToastrService,
      private router: Router,
      private authService: AuthService
    ) {}

  // Handle selecting images through input
  onImageFilesChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFiles.push({
            file: file,
            imagePreviewUrl: e.target.result
          });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // Handle drag-and-drop upload
  onImageDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      Array.from(event.dataTransfer.files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.selectedFiles.push({
              file: file,
              imagePreviewUrl: e.target.result
            });
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  // Prevent default behavior when dragging over the drop area
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // Remove selected file
  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  // Handle category checkbox change
  onCategoryChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const category = input.value;

    if (input.checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
      delete this.selectedSubcategories[category];
    }
  }

  // Get subcategories dynamically
  getSubcategories(category: string): string[] {
    const subcategoriesMap: { [key: string]: string[] } = {
      Festivals: ['Navratri', 'Onam', 'Christmas', 'Other'],
      Workshops: ['Dance Workshop', 'Music Workshop', 'Art Workshop'],
      Competitions: ['Dance', 'Singing', 'Drama', 'Quiz'],
      Gallery: ['Annual Day', 'Farewell', 'Independence Day']
    };
    return subcategoriesMap[category] || [];
  }

  // Handle submitting the form
  uploadImages() {
    const formData = new FormData();
    this.selectedFiles.forEach(item => {
      formData.append('images', item.file);
    });
    formData.append('description', this.imageDescription);
    formData.append('categories', JSON.stringify(this.selectedCategories));
    formData.append('subcategories', JSON.stringify(this.selectedSubcategories));

    // You can now send `formData` to your backend
    console.log('Form data ready to be sent', formData);
    // Example:
    // this.apiService.uploadImages(formData).subscribe(...)
  }
}