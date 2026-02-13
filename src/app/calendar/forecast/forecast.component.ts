import { Component, inject, OnInit } from "@angular/core";

import { WeatherService } from '../weather.service';

@Component({
  selector: "app-forecast",
  imports: [],
  templateUrl: "./forecast.component.html",
  styleUrl: "./forecast.component.css",
})
export class ForecastComponent implements OnInit {
// Check Local Storage for a saved weather object and timestamp
// If the data exists and is less than 24 hours old, use it.
// If it's missing, call the API and save the new result + new timestamp.
  private weatherService = inject(WeatherService)

  ngOnInit() {
    const forecast = this.weatherService.get5DayForecast();
    console.log(forecast);
  }
}
