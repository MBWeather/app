import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ApiService } from 'src/app/services/api/api.service';
import { WeatherApiResponse } from 'src/app/types/weather';

import { Location } from '../../types/location';

const MILLISECONDS = 1000;
const KELVIN = 273.15;

@Component({
  selector: 'app-weather-forcast',
  templateUrl: './weather-forcast.component.html',
  styleUrls: ['./weather-forcast.component.scss'],
})
export class WeatherForcastComponent implements OnInit {
  protected loading: boolean = true;
  protected weatherData!: WeatherApiResponse;
  protected lastUpdated!: Date;

  protected chartData: ChartData<'line'> = {
    datasets: [
      {
        data: [],
        label: 'Temperature',
        fill: false,
        borderColor: '#4bc0c0'
      }
    ],
    labels: []
  };

  protected chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  @Input() public location!: Location;

  constructor(private apiService: ApiService) { }

  public ngOnInit(): void {
    this.triggerFetchWD();
  }

  protected triggerFetchWD(): void {
    this.loading = true;
    this.fetchWeatherData().then(() => {
      this.loading = false;
      this.lastUpdated = new Date();
      this.updateChartData();
    });
  }

  private async fetchWeatherData(): Promise<void> {
    let hasError = false;

    return new Promise((resolve, reject) => {
      this.apiService.get<WeatherApiResponse>('3.0/onecall', {
        lat: this.location.coordinates.lat,
        lon: this.location.coordinates.lon,
      })?.subscribe({
        next: (response: WeatherApiResponse) => {
          console.log("Weather data fetched successfully.");
          console.log(response);
          this.weatherData = response;
        },
        error: (error) => {
          console.log("An error occurred while fetching weather data.");
          console.error(error);

          // Set hasError to true
          hasError = true;
        }, complete: () => {
          // Resolve the promise if it didn't fail
          if (hasError) {
            reject();
          } else {
            resolve();
          }
        }
      });
    });
  }

  private updateChartData(): void {
    if (!this.weatherData || !this.weatherData.daily) {
      console.log("No weather data available.");
      return;
    }

    if (this.weatherData) {
      this.chartData.labels = this.weatherData.daily.map(day => new Date(day.dt * MILLISECONDS).toLocaleDateString());
      this.chartData.datasets[0].data = this.weatherData.daily.map(day => day.temp.day - KELVIN); // Convert Kelvin to Celsius
    }
  }
}
