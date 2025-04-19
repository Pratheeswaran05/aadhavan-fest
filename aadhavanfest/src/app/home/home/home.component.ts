import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  latestVideos: any[] = [];


  @ViewChild('introVideo') introVideo!: ElementRef<HTMLVideoElement>;


  teamMembers = [
    {
      name: 'John Doe',
      description: 'Event Coordinator',
      imageUrl: 'assets/images/john.jpg'
    },
    {
      name: 'Jane Smith',
      description: 'Design Head',
      imageUrl: 'assets/images/jane.jpg'
    },
    {
      name: 'Mike Johnson',
      description: 'Marketing Lead',
      imageUrl: 'assets/images/mike.jpg'
    },
    {
      name: 'John Doe',
      description: 'Event Coordinator',
      imageUrl: 'assets/images/john.jpg'
    },
    {
      name: 'Jane Smith',
      description: 'Design Head',
      imageUrl: 'assets/images/jane.jpg'
    },
    {
      name: 'Mike Johnson',
      description: 'Marketing Lead',
      imageUrl: 'assets/images/mike.jpg'
    },
    // Add more members...
  ];

  

  constructor( 
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router

  ) {}
  ngOnInit(): void {
    this.apiService.getLatestVideos(5).subscribe(
      (videos: any[]) => {
        console.log('Videos loaded:', videos); // Log the response
        this.latestVideos = videos;
      },
      (error) => {
        console.error('Error loading latest videos:', error);
        this.toastr.error('Failed to load videos');
      }
    );
  }

  ngAfterViewInit(): void {
    if (this.introVideo?.nativeElement?.autoplay && this.introVideo.nativeElement.paused) {
      this.introVideo.nativeElement.play();
    }
  }

  goToHighlights() {
    this.router.navigate(['/highlights']);
  }
}
