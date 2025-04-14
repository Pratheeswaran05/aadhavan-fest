import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-highlights',
  standalone: false,
  templateUrl: './highlights.component.html',
  styleUrl: './highlights.component.css'
})
export class HighlightsComponent implements OnInit{

  // selectedTab: string = 'inside';

  // selectTab(tab: string) {
  //   this.selectedTab = tab;
  // }


    selectedTab: 'inside' | 'outside' = 'inside'; // default value

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const tab = params.get('tab') as 'inside' | 'outside';
      if (tab === 'inside' || tab === 'outside') {
        this.selectedTab = tab;
      }
    });
  }

  selectTab(tab: 'inside' | 'outside') {
    this.selectedTab = tab;
  }
  


  shareVideo(video: any) {
    const url = `${window.location.origin}/videos/${video.id}`;
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: url,
      }).catch(err => console.error('Sharing failed:', err));
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert('Video link copied!');
      }).catch(() => alert('Copy failed'));
    }
  }

  videosInside = [
    {
      id: 'fest-2025',
      title: 'Cultural Fest 2025',
      description: 'Highlights of the annual fest.',
      src: 'assets/videos/fest.mp4',
      thumbnail: 'assets/thumbnails/fest.jpg',
      duration: '1:45',
    },
    {
      id: 'clean-drive',
      title: 'Cleanliness Drive',
      description: 'Students uniting for a clean campus.',
      src: 'assets/videos/clean_drive.mp4',
      thumbnail: 'assets/thumbnails/clean_drive.jpg',
      duration: '0:59',
    },
  ];

  videosOutside = [
    {
      id: 'tech-fest',
      title: 'Techno-Cultural Fest',
      description: 'Inter-college tech and art showcase.',
      src: 'assets/videos/tech_fest.mp4',
      thumbnail: 'assets/thumbnails/tech_fest.jpg',
      duration: '2:10',
    },
    {
      id: 'ngo-service',
      title: 'NGO Service Program',
      description: 'Community outreach activities.',
      src: 'assets/videos/ngo.mp4',
      thumbnail: 'assets/thumbnails/ngo.jpg',
      duration: '1:25',
    },
  ];
}