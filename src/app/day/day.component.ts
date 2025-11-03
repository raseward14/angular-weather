import { Component } from '@angular/core';

import { DayContainer } from '../ui/container/day-container.component';

@Component({
  selector: 'app-week-day',
  standalone: true,
  imports: [DayContainer],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})
export class WeekDay {
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
}
