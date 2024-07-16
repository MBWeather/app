import { Injectable } from '@angular/core';
import { filter, Observable, skip, startWith, takeUntil, tap } from 'rxjs';


import { MILLISECONDS, STORAGE_KEYS } from 'src/app/@mbweather/constants';
import { ApiService } from '../api/api.service';

import { WeatherApiResponse } from 'src/app/types/weather';

import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private unsubscribe$ = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private translate: TranslateService
  ) { }

  /**
   *  Get the weather data for the specified latitude and longitude.
   * NOTE: I will do further work on this logic, its late now.
   * @param lat The latitude 
   * @param lon The longitude
   * @returns An Observable of the weather data.
   */
  public getWeatherData(lat: number, lon: number): Observable<WeatherApiResponse> {
    const storageKey = `${STORAGE_KEYS['weatherData']}_${lat}_${lon}`;
    const localData: string = `${localStorage.getItem(storageKey)}`;
    const parsedData: WeatherApiResponse = localData ? JSON.parse(localData) : null;

    return this.apiService.get<WeatherApiResponse>(`3.0/onecall`, { lat, lon }).pipe(
      filter((data: WeatherApiResponse): data is WeatherApiResponse => !!data), // Ensure non-null values
      startWith(parsedData),
      tap((data: WeatherApiResponse) => {
        if (data) {
          // Append custom properties to the weather data
          data.daily.forEach((daily) => {

            this.translate.get('app.at').pipe(
              takeUntil(this.unsubscribe$)
            ).subscribe((atTranslation: string) => {
              // Format to 21.10.2018 ob 13:25
              daily.sunriseTime = moment(daily.sunrise * MILLISECONDS).format(`DD.MM.YYYY ${atTranslation} HH:mm`);
              daily.sunsetTime = moment(daily.sunset * MILLISECONDS).format(`DD.MM.YYYY ${atTranslation} HH:mm`);
            });
          });

          // Append the weather data to local storage
          this.saveToLocalStorage(data, lat, lon);
        }
      })
    );

  }

  /**
   * Save the weather data to local storage.
   * NOTE: I will do further work on this logic, its late now.
   * @param data The weather data to save.
   * @private
   */
  private saveToLocalStorage(data: WeatherApiResponse, lat: number, lon: number): void {
    const storageKey = `${STORAGE_KEYS['weatherData']}_${lat}_${lon}`;
    localStorage.setItem(storageKey, JSON.stringify(data));
  }
}
