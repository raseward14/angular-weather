import { Component, OnInit, OnDestroy, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DayContainer } from "../ui/container/day-container.component";
import { Day } from "../ui/day/day.component";

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [CommonModule, Day, DayContainer],
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"],
})
export class CalendarComponent implements OnInit, OnDestroy {
  // Use signal() to create a reactive date value
  // Types are inferred
  currentDate = signal(new Date());

  // Use computed() because this value depends on another signal
  currentYear = computed(() => this.currentDate().getFullYear());

  currentMonth = computed(() => this.currentDate().getMonth());

  currentDay = computed(() => this.currentDate().getDate());

  currentTime = computed(() => this.currentDate().getTime());

  lastDayOfMonth = computed(() =>
    new Date(this.currentYear(), this.currentMonth() + 1, 0).getDate()
  );

  firstDayOfMonth = computed(() =>
    new Date(this.currentYear(), this.currentMonth(), 1).getUTCDay()
  );
  // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Generate an array of empty items to act as spacers
  spacerDays = computed(() => new Array(this.firstDayOfMonth()));

  dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  firstDayName = computed(() => this.dayNames[this.firstDayOfMonth()]);

  public cellsArray = computed(() =>
    Array(this.lastDayOfMonth())
      .fill(0)
      .map((x, i) => i + 1)
  );

  private timerId?: number;

  ngOnInit(): void {
    console.log(`The first UTC day of the month is ${this.firstDayOfMonth()}`);
    console.log("Calendar initialized with date:", this.currentDate());
    console.log(`The current month has ${this.lastDayOfMonth()} days.`);
    console.log(`The first day of the month is ${this.firstDayName()}.`);
    console.log("Cells Array:", this.cellsArray());
    console.log(`The current day is: ${this.currentDay()}`);
    console.log(`The current time is: ${this.currentTime()}`);

    // Set up an interval timer to update the current date every second
    // If I'm only updating once a day, this cold be set to 86400000 ms (24 hours)
    // For demonstration, rendering a clock that updates every second in the UI
    this.timerId = setInterval(() => {
      this.currentDate.set(new Date());
    }, 1000);
  }

  ngOnDestroy(): void {
    // Clear the interval timer when the component is destroyed
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
}
