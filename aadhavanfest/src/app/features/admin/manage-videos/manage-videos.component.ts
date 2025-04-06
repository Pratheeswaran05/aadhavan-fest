import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-videos',
  standalone: false,
  templateUrl: './manage-videos.component.html',
  styleUrl: './manage-videos.component.css'
})
export class ManageVideosComponent {


  videoTitle: string = '';
  videoDescription: string = '';
  selectedVideoFile: File | null = null;
  selectedVideoName: string = '';
  selectedThumbnailFile: File | null = null;
  selectedThumbnailName: string = '';
  selectedCategories: string[] = [];
  categories: string[] = ['Highlights', 'Achievements', 'Events', 'Gallery'];



  // Track selected subcategories
  
  selectedSubcategories: { [key: string]: string } = {};

  // Dummy subcategories for each category
  subcategoriesMap: { [key: string]: string[] } = {
    Highlights: ['Inside College', 'Outside College'],
    Achievements: ['District', 'State', 'National'],
    Events: ['Upcomming Events', 'Past Events'],
    Gallery: ['Photos', 'Videos'],
    College: ['About', 'Faclities', 'Clubs']
  };

  onCategoryChange(event: any) {
    const category = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
      delete this.selectedSubcategories[category]; // remove subcategory selection if category unchecked
    }
  }

  getSubcategories(category: string): string[] {
    return this.subcategoriesMap[category] || [];
  }

  uploadedVideos: any[] = [];

  // @ViewChild('videoInput') videoInput!: ElementRef<HTMLInputElement>;
  // @ViewChild('thumbnailInput') thumbnailInput!: ElementRef<HTMLInputElement>;

  constructor() {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onVideoDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file && file.type.startsWith('video/')) {
      this.selectedVideoFile = file;
      this.selectedVideoName = file.name;
    }
  }

  onThumbnailDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedThumbnailFile = file;
      this.selectedThumbnailName = file.name;
    }
  }

  onVideoFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.startsWith('video/')) {
        this.selectedVideoFile = file;
        this.selectedVideoName = file.name;
      }
    }
  }

  onThumbnailChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        this.selectedThumbnailFile = file;
        this.selectedThumbnailName = file.name;
      }
    }
  }

  // onCategoryChange(event: any) {
  //   const category = event.target.value;
  //   if (event.target.checked) {
  //     this.selectedCategories.push(category);
  //   } else {
  //     this.selectedCategories = this.selectedCategories.filter(c => c !== category);
  //   }
  // }

  // onSubmit() {
    // if (!this.videoTitle || !this.selectedVideoFile || !this.selectedThumbnailFile) {
    //   alert('Please fill in all required fields!');
    //   return;
    // }

    // const newVideo = {
    //   title: this.videoTitle,
    //   videoUrl: URL.createObjectURL(this.selectedVideoFile),  // Only preview in frontend
    //   thumbnailUrl: URL.createObjectURL(this.selectedThumbnailFile),
    //   categories: [...this.selectedCategories],
    //   description: this.videoDescription
    // };

    // this.uploadedVideos.push(newVideo);

    // Reset form
  //   this.videoTitle = '';
  //   this.videoDescription = '';
  //   this.selectedVideoFile = null;
  //   this.selectedVideoName = '';
  //   this.selectedThumbnailFile = null;
  //   this.selectedThumbnailName = '';
  //   this.selectedCategories = [];
  //   if (this.videoInput) this.videoInput.nativeElement.value = '';
  //   if (this.thumbnailInput) this.thumbnailInput.nativeElement.value = '';
  // }

}