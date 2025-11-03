import { Component, signal } from '@angular/core';

import { AppHeader } from './app-header/app-header';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppHeader, CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = signal('angular-weather');
}
