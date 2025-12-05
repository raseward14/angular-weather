import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeekDay } from '../week-day/week-day.component';
import { DayContainer } from "../ui/container/day-container.component";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [WeekDay, CommonModule, DayContainer],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  currentDate: Date = new Date();
  currentYear: number = this.currentDate.getFullYear();
  currentMonth: number = this.currentDate.getMonth(); 
  lastDayOfMonth: number = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  firstDayOfMonth: number = new Date(this.currentYear, this.currentMonth, 1).getUTCDay();
  // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  firstDayName: string = this.dayNames[this.firstDayOfMonth];

  public cellsArray: number[] = Array(this.lastDayOfMonth).fill(0).map((x, i) => i + 1)

  ngOnInit(): void {
    console.log('Calendar initialized with date:', this.currentDate);
    console.log(`The current month has ${this.lastDayOfMonth} days.`);
    console.log(`The first day of the month is ${this.firstDayName}.`);
    console.log('Cells Array:', this.cellsArray);
  }
}
