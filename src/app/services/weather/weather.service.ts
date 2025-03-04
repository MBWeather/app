import { Injectable } from '@angular/core';
import { filter, Observable, skip, startWith, tap } from 'rxjs';


import { STORAGE_KEYS } from 'src/app/@mbweather/constants';
import { ApiService } from '../api/api.service';

import { WeatherApiResponse } from 'src/app/types/weather';
import { WeatherForcastComponent } from 'src/app/modules/home/components/weather-forecast/weather-forecast.component';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private apiService: ApiService) { }

  /**
   *  Get the weather data for the specified latitude and longitude.
   * @param lat The latitude 
   * @param lon The longitude
   * @returns An Observable of the weather data.
   */
  public getWeatherData(lat: number, lon: number): Observable<WeatherApiResponse> {
    const localData: string = `${localStorage.getItem(STORAGE_KEYS['weatherData'])}`;
    const parsedData: WeatherApiResponse = localData ? JSON.parse(localData) : null;

    return this.apiService.get<WeatherApiResponse>(`3.0/onecall`, { lat, lon }).pipe(
      filter((data: WeatherApiResponse): data is WeatherApiResponse => !!data), // Ensure non-null values
      startWith(parsedData),
      skip(1), // Skip the first emission which is the startWith value
      tap((data: WeatherApiResponse) => {
        if (data) {
          this.saveToLocalStorage(data);
        }
      })
    );
  }

  /**
   * Save the weather data to local storage.
   * @param data The weather data to save.
   * @private
   */
  private saveToLocalStorage(data: WeatherApiResponse): void {
    localStorage.setItem(STORAGE_KEYS['weatherData'], JSON.stringify(data));
  }
}
