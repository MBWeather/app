import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherApiResponse } from 'src/app/types/weather';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly storageKeys = environment.app.config.storage.keys;
  
  constructor(private http: HttpClient) {}

  getWeatherData(lat: number, lon: number): Observable<WeatherApiResponse> {
    return this.http.get<WeatherApiResponse>(`3.0/onecall?lat=${lat}&lon=${lon}`);
  }

  saveToLocalStorage(data: WeatherApiResponse): void {
    localStorage.setItem(this.storageKeys['weatherData'], JSON.stringify(data));
  }

  getFromLocalStorage(): WeatherApiResponse | null {
    const data = localStorage.getItem(this.storageKeys['weatherData']);
    return data ? JSON.parse(data) : null;
  }
}
