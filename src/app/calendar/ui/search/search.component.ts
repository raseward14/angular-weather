import { Component, signal } from '@angular/core';

// 1. Import the Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  apiKey = import.meta.env.NG_APP_GEOCODE_API_KEY;

  suggestions: any[] = [];
  lastValue = signal('');
  displayFn(loc: any): string {
    return loc ? loc.display_name : '';
  };

  async onType(value: string) {
    if (value.length < 3) return; // don't search until user has entered at least 3 letters
    this.lastValue.set(value);

    const url = `https://geocode.maps.co/search?q=${value}&api_key=${this.apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      this.suggestions = data;
    } catch (error) {
      console.error('Geocoding error: ', error);
    }
  }

  onSelect(location: any) {
    const city = location.display_name;
    const lat = location.lat;
    const lon = location.lon;

    console.log(location);

    console.log(`Setting location to ${city} (${lat}, ${lon})`);

    // pass to weather service
  }

}
