import { Component, inject, OnInit } from "@angular/core";

import { WeatherService } from '../weather.service';

@Component({
  selector: "app-forecast",
  imports: [],
  templateUrl: "./forecast.component.html",
  styleUrl: "./forecast.component.css",
})
export class ForecastComponent implements OnInit {
  private weatherService = inject(WeatherService)

  ngOnInit() {
    // we'll need to call getLocation instead, from there check the forecast of that location
    // const forecast = this.weatherService.get5DayForecast();
    // console.log(forecast);
  }
}
