import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, startWith } from 'rxjs';
import { WeatherApiResponse } from 'src/app/types/weather';
import { environment } from 'src/environments/environment';
import { STORAGE_KEYS } from 'src/app/@mbweather/constants';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly weatherData!: Observable<WeatherApiResponse>;
  
  constructor(private apiService: ApiService) {}

  public getWeatherData(lat: number, lon: number): Observable<WeatherApiResponse> {
    return this.apiService.get<WeatherApiResponse>(`/3.0/onecall`, {
      lat,
      lon,
      appid: environment.api.servers.primary.keys['3.0/onecall']
    }).pipe(startWith(JSON.parse(localStorage.getItem(STORAGE_KEYS['weatherData']) || '')));
  }

  public saveToLocalStorage(data: WeatherApiResponse): void {
    localStorage.setItem(STORAGE_KEYS['weatherData'], JSON.stringify(data));
  }
}
