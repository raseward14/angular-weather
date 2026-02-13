import { Injectable } from '@angular/core';

import type { lastFetch } from './calendar.types';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  isExpired(lastFetch: lastFetch): boolean {
    if (!lastFetch) return true;

    // last fetch string timestamp covert to number
    // one day in milliseconds
    const timeStamp = Number(lastFetch);
    const oneDayMs = 24 * 60 * 60 * 1000;

    // returns true if difference is > oneDayMs
    return (Date.now() - timeStamp) > oneDayMs;
  }

  async get5DayForecast() {
    // saved value
    // check if expired
    const lastFetch: lastFetch = localStorage.getItem('last-fetch');
    const fetchNeeded = this.isExpired(lastFetch);
    console.log(`fetch needed: ${fetchNeeded}. Last fetch at ${lastFetch}`)

    if (fetchNeeded) {
      try {
        // fetch 5 day forecast
        const apiKey = import.meta.env.NG_APP_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=Greeley&appid=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();
        
        // store the timestamp of the fetch AND the data
        localStorage.setItem('last-fetch', Date.now().toString());
        localStorage.setItem('forecast-data', JSON.stringify(data.list));
  
        return data.list;
      } catch (error) {
        console.error('Error fetching data', error);
        // return still needed to prevent function returning undefined
        return [];
      }
    }
  }
}
