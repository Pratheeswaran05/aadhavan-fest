import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/auth.service';
import { UploadService } from '../../../core/upload.service';

@Component({
  selector: 'app-manage-videos',
  standalone: false,
  templateUrl: './manage-videos.component.html',
  styleUrl: './manage-videos.component.css'
})
export class ManageVideosComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  videoTitle: string = '';
  videoDescription: string = '';
  categories: string[] = ['Highlights', 'Achievements', 'Events', 'Gallery'];
  selectedCategories: string[] = [];
  // selectedSubcategories: { [key: string]: string } = {};
  selectedSubcategories: { [key: string]: string[] } = {}; // Fix the type to string[]


  subcategoriesMap: { [key: string]: string[] } = {
    Highlights: ['Inside College', 'Outside College'],
    Achievements: ['District', 'State', 'National'],
    Events: ['Upcoming Events', 'Past Events'],
    Gallery: ['Photos', 'Videos'],
    College: ['About', 'Facilities', 'Clubs']
  };
  // Define getSubcategories method
  getSubcategories(category: string): string[] {
    return this.subcategoriesMap[category] || [];
  }

  selectedFiles: {
    video: File;
    thumbnail: File | null;
    videoPreviewUrl: SafeUrl;
    thumbnailPreviewUrl: SafeUrl | null;
  }[] = [];

  adminId!: number;
  selectedFile: File | null = null;
  videoPreviewUrl: string | null = null;

  isLoading: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private uploadService: UploadService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getAdmin().subscribe({
      next: (adminData) => {
        if (!adminData) {
          this.toastr.error('Admin not logged in.', 'Access Denied');
          this.router.navigate(['/admin/login']);
          return;
        }
        this.adminId = adminData.id;
      },
      error: () => {
        this.toastr.error('Failed to fetch admin data.');
        this.router.navigate(['/admin/login']);
      }
    });
  }

  // onCategoryChange(event: any) {
  //   const category = event.target.value;
  //   const checked = event.target.checked;

  //   if (checked) {
  //     this.selectedCategories.push(category);
  //   } else {
  //     this.selectedCategories = this.selectedCategories.filter(c => c !== category);
  //     delete this.selectedSubcategories[category];
  //   }
  // }

  // getSubcategories(category: string): string[] {
  //   return this.subcategoriesMap[category] || [];
  // }

  onCategoryChange(event: any) {
    const category = event.target.value;
    const checked = event.target.checked;
  
    if (checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
      delete this.selectedSubcategories[category]; // Remove any subcategories if the category is unchecked
    }
  }
  
  onSubcategoryChange(event: any, category: string) {
    const subcategory = event.target.value;
    const checked = event.target.checked;
  
    if (checked) {
      // Store the subcategory under the appropriate category
      if (!this.selectedSubcategories[category]) {
        this.selectedSubcategories[category] = [];
      }
      this.selectedSubcategories[category].push(subcategory);
    } else {
      // Remove subcategory if unchecked
      this.selectedSubcategories[category] = this.selectedSubcategories[category].filter(
        (sub) => sub !== subcategory
      );
      if (this.selectedSubcategories[category].length === 0) {
        delete this.selectedSubcategories[category]; // Remove the category if no subcategories are selected
      }
    }
  
    console.log('Selected Subcategories:', this.selectedSubcategories);
  }

  
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

  onThumbnailChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const thumbnailUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      this.selectedFiles[index].thumbnail = file;
      this.selectedFiles[index].thumbnailPreviewUrl = thumbnailUrl;
    }
  }

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

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  // uploadVideo() {
  //   if (this.selectedFiles.length === 0) {
  //     this.toastr.error('Please select at least one video to upload.');
  //     return;
  //   }

  //   this.isLoading = true;

  //   const fileSet = this.selectedFiles[0];
  //   const formData = new FormData();
  //   formData.append('video', fileSet.video);
  //   if (fileSet.thumbnail) {
  //     formData.append('thumbnail', fileSet.thumbnail);
  //   }

  //   formData.append('title', this.videoTitle);
  //   formData.append('description', this.videoDescription);
  //   formData.append('categories', JSON.stringify(this.selectedCategories));

  //   const formattedSubcategories: { [key: string]: string } = {};
  //   for (const category in this.selectedSubcategories) {
  //     const sub = this.selectedSubcategories[category];
  //     if (sub) {
  //       const key = sub.toLowerCase().replace(/\s+/g, '_');
  //       formattedSubcategories[key] = 'true';
  //     }
  //   }
  //   // Log the formatted subcategories
  //   for (const key in formattedSubcategories) {
  //     console.log(`${key}: ${formattedSubcategories[key]}`);
  //   }
    
  //   formData.append('subcategories', JSON.stringify(formattedSubcategories));

  //   formData.append('adminId', this.adminId.toString());

  //   this.uploadService.uploadVideo(formData).subscribe({
  //     next: () => {
  //       this.toastr.success('Video uploaded successfully!');
  //       this.selectedFiles = [];
  //       this.videoTitle = '';
  //       this.videoDescription = '';
  //       this.selectedCategories = [];
  //       this.selectedSubcategories = {};
  //       this.isLoading = false;
  //     },
  //     error: () => {
  //       this.toastr.error('Video upload failed.');
  //       this.isLoading = false;
  //     }
  //   });
  // }
  uploadVideo() {
    if (this.selectedFiles.length === 0) {
      this.toastr.error('Please select at least one video to upload.');
      return;
    }
  
    this.isLoading = true;
  
    const fileSet = this.selectedFiles[0];
    const formData = new FormData();
    formData.append('video', fileSet.video);
    if (fileSet.thumbnail) {
      formData.append('thumbnail', fileSet.thumbnail);
    }
  
    formData.append('title', this.videoTitle);
    formData.append('description', this.videoDescription);
    formData.append('categories', JSON.stringify(this.selectedCategories));
  
    // Format subcategories
    const formattedSubcategories: { [key: string]: string[] } = {};
    for (const category in this.selectedSubcategories) {
      formattedSubcategories[category] = this.selectedSubcategories[category];
    }
    console.log('Formatted Subcategories before upload:', formattedSubcategories);
  
    formData.append('subcategories', JSON.stringify(formattedSubcategories));
  
    formData.append('adminId', this.adminId.toString());
  
    this.uploadService.uploadVideo(formData).subscribe({
      next: () => {
        this.toastr.success('Video uploaded successfully!');
        this.selectedFiles = [];
        this.videoTitle = '';
        this.videoDescription = '';
        this.selectedCategories = [];
        this.selectedSubcategories = {};
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Video upload failed.');
        this.isLoading = false;
      }
    });
  }
  
}
