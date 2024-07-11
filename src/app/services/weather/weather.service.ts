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
  constructor(private apiService: ApiService) {}

  public getWeatherData(lat: number, lon: number): Observable<WeatherApiResponse> {
    return this.apiService.get<WeatherApiResponse>(`3.0/onecall`, { lat, lon }).pipe(
      startWith(JSON.parse(localStorage.getItem(STORAGE_KEYS['weatherData']) || 'null')),
      filter((data: WeatherApiResponse | null): data is WeatherApiResponse => !!data), // Ensure non-null values
      skip(1), // Skip the first emission which is the startWith value
      tap((data: WeatherApiResponse) => {
        if (data) {
          this.saveToLocalStorage(data);
        }
      })
    );
    }

  private saveToLocalStorage(data: WeatherApiResponse): void {
    localStorage.setItem(STORAGE_KEYS['weatherData'], JSON.stringify(data));
  }
}
