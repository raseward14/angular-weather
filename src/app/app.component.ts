import { Component, signal } from '@angular/core';

import { AppHeader } from './app-header/app-header';
import { WeekDay } from './day/day.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppHeader, WeekDay],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = signal('angular-weather');
}
