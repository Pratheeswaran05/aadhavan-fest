import { Component } from '@angular/core';

@Component({
  selector: 'app-achievements',
  standalone: false,
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.css'
})
export class AchievementsComponent {
  // achievementTab: string = 'district';

  // selectAchievementTab(tab: string) {
  //   this.achievementTab = tab;
  // }

  achievementTab: 'district' | 'state' | 'national' = 'district';

  achievementVideos = {
    district: [
      {
        title: 'District Debate Champions',
        description: 'Winning speech moments from the final round.',
        src: 'assets/videos/district1.mp4',
        thumbnail: 'assets/thumbnails/district1.jpg',
        duration: '02:30'
      },
      {
        title: 'Science Fair Highlights',
        description: 'Award-winning science fair project.',
        src: 'assets/videos/district2.mp4',
        thumbnail: 'assets/thumbnails/district2.jpg',
        duration: '01:45'
      },
    ],
    state: [
      {
        title: 'Basketball Victory',
        description: 'State-level gold medal match highlights.',
        src: 'assets/videos/state1.mp4',
        thumbnail: 'assets/thumbnails/state1.jpg',
        duration: '03:10'
      },
      {
        title: 'State Drama Performance',
        description: 'Best drama act of the year.',
        src: 'assets/videos/state2.mp4',
        thumbnail: 'assets/thumbnails/state2.jpg',
        duration: '02:15'
      },
    ],
    national: [
      {
        title: 'National Innovation Challenge',
        description: 'Behind the scenes of our winning idea.',
        src: 'assets/videos/national1.mp4',
        thumbnail: 'assets/thumbnails/national1.jpg',
        duration: '02:50'
      },
      {
        title: 'Youth Parliament',
        description: 'Best speaker award moment.',
        src: 'assets/videos/national2.mp4',
        thumbnail: 'assets/thumbnails/national2.jpg',
        duration: '01:55'
      },
    ]
  };

  selectAchievementTab(tab: 'district' | 'state' | 'national') {
    this.achievementTab = tab;
  }

  shareVideo(video: any) {
    const url = window.location.origin + '/' + video.src;
    navigator.clipboard.writeText(url).then(() => {
      alert('Video link copied to clipboard!');
    });
  }
}
