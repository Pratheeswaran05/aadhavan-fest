import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuOpen= false;
  expandedMenu: string | null = null; // Change type to string | null
  
  constructor(private router: Router) {}
  

  // menuItems = [
  //   { id: 'highlights', name: 'Highlights', route: '/highlights', subItems: ['Inside College', 'Outside College'] },
  //   { id: 'achievements', name: 'Achievements', route: '/achievements', subItems: ['District', 'State', 'National'] },
  //   { id: 'events', name: 'Events', route: '/events', subItems: ['Upcoming Events', 'Past Events'] },
  //   { id: 'gallery', name: 'Gallery', route: '/gallery', subItems: ['Videos', 'Photos'] },
  //   { id: 'college', name: 'College', route: '/college', subItems: ['About', 'Facilities', 'Members', 'Clubs'] }
  // ];
  menuItems = [
    {
      id: 'highlights',
      name: 'Highlights',
      route: '/highlights',
      subItems: [
        { label: 'Inside College', tab: 'inside' },
        { label: 'Outside College', tab: 'outside' }
      ]
    },
    {
      id: 'achievements',
      name: 'Achievements',
      route: '/achievements',
      subItems: [
        { label: 'District', tab: 'district' },
        { label: 'State', tab: 'state' },
        { label: 'National', tab: 'national' }
      ]
    },
    {
      id: 'events',
      name: 'Events',
      route: '/events',
      subItems: [
        { label: 'Upcoming Events', tab: 'upcoming' },
        { label: 'Past Events', tab: 'past' }
      ]
    },
    {
      id: 'gallery',
      name: 'Gallery',
      route: '/gallery',
      subItems: [
        { label: 'Videos', tab: 'videos' },
        { label: 'Photos', tab: 'photos' }
      ]
    },
    {
      id: 'college',
      name: 'College',
      route: '/college',
      subItems: [
        { label: 'About', tab: 'about' },
        { label: 'Facilities', tab: 'facilities' },
        { label: 'Members', tab: 'members' },
        { label: 'Clubs', tab: 'clubs' }
      ]
    }
  ];
  

  // getFormattedRoute(menuRoute: string, subItem: string): string {
  //   return `${menuRoute}/${subItem.toLowerCase().replace(/ /g, '-')}`;
  // }
  
  // getFormattedRoute(menuRoute: string, subItem: string): string {
  //   const tab = subItem.toLowerCase().replace(/ /g, '');
  //   return `${menuRoute}/${tab}`; // returns 'highlights/outside'
  // }
 
  getFormattedRoute(menuRoute: string, subItem: { label: string; tab: string }): string {
    return `${menuRoute}/${subItem.tab}`;
  }
  

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  
  toggleDropdown(menuId: string) {  // Change type to string
    this.expandedMenu = this.expandedMenu === menuId ? null : menuId;
  }

}
