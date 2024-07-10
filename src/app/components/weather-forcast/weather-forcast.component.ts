import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ApiService } from 'src/app/services/api/api.service';
import { WeatherApiResponse } from 'src/app/types/weather';

import { Location } from '../../types/location';
import * as moment from 'moment';

@Component({
  selector: 'app-weather-forcast',
  templateUrl: './weather-forcast.component.html',
  styleUrls: ['./weather-forcast.component.scss'],
})
export class WeatherForcastComponent implements OnInit {

  protected readonly MILLISECONDS = 1000;
  protected readonly KELVIN = 273.15;

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

  protected triggerFetchWD(isRefresh: boolean = false): void {
    this.loading = true;
    this.fetchWeatherData(isRefresh).then(() => {
      this.loading = false;
      this.lastUpdated = new Date();
      this.updateChartData();

      if (!this.weatherData.daily) return;

      // Format the sunrise and sunset times with moment.js
      this.weatherData.daily.forEach(daily => {


        // Format to 21.10.2018 ob 13:25
        daily.sunriseTime = moment(daily.sunrise * this.MILLISECONDS).format('DD.MM.YYYY ob HH:mm');
        daily.sunsetTime = moment(daily.sunset * this.MILLISECONDS).format('DD.MM.YYYY ob HH:mm');
      });
    });
  }

  private async fetchWeatherData(isRefresh: boolean = false): Promise<void> {
    let hasError = false;

    // If it's not a refresh and there is data in the local storage, use it
    if (
      !isRefresh &&  // Check if it's not a refresh
      localStorage.getItem('weatherData') &&   // Check if there is data in the local storage
      (`${localStorage.getItem('weatherData')}`).length < 10) { // Check if the data is too small to be valid
      this.weatherData = JSON.parse(localStorage.getItem('weatherData') || '{}');
      return;
    }

    // Otherwise, fetch the data from the API
    return new Promise((resolve, reject) => {
      this.apiService.get<WeatherApiResponse>('3.0/onecall', {
        lat: this.location.coordinates.lat,
        lon: this.location.coordinates.lon,
      })?.subscribe({
        next: (response: WeatherApiResponse) => {
          this.weatherData = response;

          // Save the data to local storage
          localStorage.setItem('weatherData', JSON.stringify(response));
        },
        error: (error) => {
          console.error("An error occurred while fetching weather data:", error);

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
      this.chartData.labels = this.weatherData.daily.map(day => new Date(day.dt * this.MILLISECONDS).toLocaleDateString());
      this.chartData.datasets[0].data = this.weatherData.daily.map(day => day.temp.day - this.KELVIN); // Convert Kelvin to Celsius
    }
  }
}
