import { Component } from '@angular/core';

import { DayContainer } from '../ui/container/day-container.component';

@Component({
  selector: 'app-week-day',
  standalone: true,
  imports: [DayContainer],
  templateUrl: './week-day.component.html',
  styleUrl: './week-day.component.css'
})
export class WeekDay {
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
}
