import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-manage-videos',
  standalone: false,
  templateUrl: './manage-videos.component.html',
  styleUrl: './manage-videos.component.css'
})
export class ManageVideosComponent {

  videoTitle: string = '';
  videoDescription: string = '';
  categories: string[] = ['Highlights', 'Achievements', 'Events', 'Gallery'];
  selectedCategories: string[] = [];
  selectedSubcategories: { [key: string]: string } = {};
  
  subcategoriesMap: { [key: string]: string[] } = {
    Highlights: ['Inside College', 'Outside College'],
    Achievements: ['District', 'State', 'National'],
    Events: ['Upcoming Events', 'Past Events'],
    Gallery: ['Photos', 'Videos'],
    College: ['About', 'Facilities', 'Clubs']
  };

  selectedFiles: {
    video: File;
    thumbnail: File | null;
    videoPreviewUrl: SafeUrl;
    thumbnailPreviewUrl: SafeUrl | null;
  }[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    // private videoService: VideoService
  ) {}

  onCategoryChange(event: any) {
    const category = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
      delete this.selectedSubcategories[category];
    }
  }

  getSubcategories(category: string): string[] {
    return this.subcategoriesMap[category] || [];
  }

  // --- VIDEO FILE SELECT ---
  onVideoFilesChange(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('video/')) {
          const videoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
          this.selectedFiles.push({
            video: file,
            thumbnail: null,
            videoPreviewUrl: videoUrl,
            thumbnailPreviewUrl: null
          });
        }
      });
    }
  }

  // --- THUMBNAIL SELECT ---
  onThumbnailChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const thumbnailUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      this.selectedFiles[index].thumbnail = file;
      this.selectedFiles[index].thumbnailPreviewUrl = thumbnailUrl;
    }
  }

  // --- DRAG & DROP VIDEO ---
  onVideoDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file && file.type.startsWith('video/')) {
      const videoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      this.selectedFiles.push({
        video: file,
        thumbnail: null,
        videoPreviewUrl: videoUrl,
        thumbnailPreviewUrl: null
      });
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // --- REMOVE A FILE ---
  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  // --- SUBMIT UPLOAD ---
  // onSubmit() {
  //   this.selectedFiles.forEach(filePair => {
  //     const formData = new FormData();
  //     formData.append('video', filePair.video);
  //     if (filePair.thumbnail) {
  //       formData.append('thumbnail', filePair.thumbnail);
  //     }
  //     formData.append('title', this.videoTitle);
  //     formData.append('description', this.videoDescription);
  //     formData.append('categories', JSON.stringify(this.selectedCategories));
  //     formData.append('subcategories', JSON.stringify(this.selectedSubcategories));

  //     this.videoService.uploadVideo(formData).subscribe({
  //       next: (response) => {
  //         console.log('Uploaded:', response);
  //       },
  //       error: (error) => {
  //         console.error('Upload failed:', error);
  //       }
  //     });
  //   });
  // }
}