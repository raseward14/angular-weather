import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeekDay } from '../week-day/week-day.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [WeekDay, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit{
  currentDate: Date = new Date();

  ngOnInit(): void {
    console.log('Calendar initialized with date:', this.currentDate);
  }
}
