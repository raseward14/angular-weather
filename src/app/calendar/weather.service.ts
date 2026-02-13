import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = import.meta.env.NG_APP_WEATHER_API_KEY;

  get5DayForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=Greeley&appid=${this.apiKey}`
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        return data.list
      });
  }
}
