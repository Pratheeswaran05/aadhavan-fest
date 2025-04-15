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
  

  menuItems = [
    { id: 'highlights', name: 'Highlights', route: '/highlights', subItems: ['Inside College', 'Outside College'] },
    { id: 'achievements', name: 'Achievements', route: '/achievements', subItems: ['District', 'State', 'National'] },
    { id: 'events', name: 'Events', route: '/events', subItems: ['Upcoming Events', 'Past Events'] },
    { id: 'gallery', name: 'Gallery', route: '/gallery', subItems: ['Videos', 'Photos'] },
    { id: 'college', name: 'College', route: '/college', subItems: ['About', 'Facilities', 'Clubs'] }
  ];

  // getFormattedRoute(menuRoute: string, subItem: string): string {
  //   return `${menuRoute}/${subItem.toLowerCase().replace(/ /g, '-')}`;
  // }
  
  getFormattedRoute(menuRoute: string, subItem: string): string {
    const tab = subItem.toLowerCase().replace(/ /g, '');
    return `${menuRoute}/${tab}`; // returns 'highlights/outside'
  }
  

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  
  toggleDropdown(menuId: string) {  // Change type to string
    this.expandedMenu = this.expandedMenu === menuId ? null : menuId;
  }
}
