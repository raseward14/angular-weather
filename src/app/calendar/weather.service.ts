import { Injectable } from '@angular/core';

import type { lastFetch } from './calendar.types';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = import.meta.env.NG_APP_WEATHER_API_KEY;

  isExpired(lastFetch: lastFetch): boolean {
    if (!lastFetch) return true;
    // last fetch string timestamp covert to number
    // one day in milliseconds
    const timeStamp = Number(lastFetch);
    const oneDayMs = 24 * 60 * 60 * 1000;

    // returns true if difference is > oneDayMs
    return (Date.now() - timeStamp) > oneDayMs;
  }

  async get5DayForecast(lat: string, lon: string) {
    // saved value
    // check if expired
    const lastFetch: lastFetch = localStorage.getItem('last-fetch');
    const fetchNeeded = this.isExpired(lastFetch);
    console.log(`fetch needed: ${fetchNeeded}. Last fetch at ${lastFetch}`)

    if (fetchNeeded) {
      try {
        // fetch 5 day forecast

        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;

        const response = await fetch(url);
        const data = await response.json();
        
        // store the timestamp of the fetch AND the data
        // these should maybe be stored in specific locations - so we have multiple locations that can be cached
        localStorage.setItem('last-fetch', Date.now().toString());
        localStorage.setItem('forecast-data', JSON.stringify(data.list));
        
        console.log('Caching: ', data.list);
        return data.list;
      } catch (error) {
        console.error('Error fetching data', error);
        // return still needed to prevent function returning undefined
        return [];
      }
    } else {
      // if not fetch is needed, the data is cached, we can return it
      console.log('Loading from cache...');
      const cachedData = localStorage.getItem('forecast-data');
      return cachedData ? JSON.parse(cachedData) : [];
    }
  }

  // async getLocation(city: string, state: string, country: string) {
  //   try {
  //     const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=5&appid=${this.apiKey}`;

  //     const response = await fetch(url);
  //     const data = response.json();

  //     console.log(data);

  //     // this will need to be passed to get5DayForecast
  //     return {};
  //   } catch (error) {
  //     console.error('Error fetching data', error);
  //     return {};
  //   }
  // }
}
