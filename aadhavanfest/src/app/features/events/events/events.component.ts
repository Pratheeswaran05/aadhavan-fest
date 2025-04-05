import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  standalone: false,
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  eventTab: string = 'district';

  selectEventTab(tab: string) {
    this.eventTab = tab;
  }
}
