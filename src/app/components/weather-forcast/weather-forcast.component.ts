import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { WeatherApiResponse } from 'src/app/types/weather';

@Component({
  selector: 'app-weather-forcast',
  templateUrl: './weather-forcast.component.html',
  styleUrls: ['./weather-forcast.component.scss'],
})
export class WeatherForcastComponent  implements OnInit {

  protected loading: boolean = true;

  protected forecast: any = [];

  protected lastUpdated: string = '';

  constructor(
    private apiService: ApiService
  ) {}

  public ngOnInit(): void {
    console.log("Fetching weather data...");
    this.apiService.get<WeatherApiResponse>('3.0/onecall', {
      lat: '33.44',
      lon: '-94.04'
    })?.subscribe({
      next: (response: WeatherApiResponse) => {
        console.log("Weather data fetched successfully.");
        console.log(response);
        this.forecast = response.daily;
      },
      error: (error) => {
        console.log("An error occurred while fetching weather data.");
        console.error(error);
      }
    });
  }

  protected refreshForecast(): void {
  }
}
