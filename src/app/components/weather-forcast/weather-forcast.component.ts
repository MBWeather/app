import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ApiService } from 'src/app/services/api/api.service';
import { WeatherApiResponse } from 'src/app/types/weather';

import { Location } from '../../types/location';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment.prod';
import { Langauges } from 'src/app/types/langauges';

@Component({
  selector: 'app-weather-forcast',
  templateUrl: './weather-forcast.component.html',
  styleUrls: ['./weather-forcast.component.scss'],
})
export class WeatherForcastComponent implements OnInit {

  protected readonly MILLISECONDS: number = environment.app.config.constants.MILLISECONDS;
  protected readonly KELVIN: number = environment.app.config.constants.KELVIN;
  protected readonly languages: Langauges = environment.app.config.languages;
  protected readonly langRegEx: RegExp = new RegExp(`^${this.languages.available.map(lang => lang.short).join('|')}$`, 'i');
  private readonly storageKeys: { [key: string]: string } = environment.app.config.storage.keys;
  private readonly browserLang: string = `${this.translate.getBrowserLang()}`;

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
      },
      {
        data: [],
        label: 'Feels Like Temperature',
        fill: false,
        borderColor: '#ff6384'
      },
      {
        data: [],
        label: 'Humidity',
        fill: false,
        borderColor: '#36a2eb'
      },
      {
        data: [],
        label: 'Wind Speed',
        fill: false,
        borderColor: '#ffcd56'
      },
      {
        data: [],
        label: 'Pressure',
        fill: false,
        borderColor: '#9966ff'
      },
      {
        data: [],
        label: 'Dew Point',
        fill: false,
        borderColor: '#ff9f40'
      },
      {
        data: [],
        label: 'UV Index',
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

  /**
   * 
   * @param apiService Service for fetching data from the API
   * @param translate Service for translating text to different languages
   */
  constructor(
    private apiService: ApiService,
    private translate: TranslateService
  ) {
    // Available languages
    translate.addLangs(this.languages.available.map(lang => lang.short));
    // Set the default language
    translate.setDefaultLang(this.languages.default);
    // Set the language based on the browser language
    translate.use(this.browserLang.match(this.langRegEx) ? this.browserLang : this.languages.default);
  }

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
      localStorage.getItem(this.storageKeys['weatherData']) &&   // Check if there is data in the local storage
      (`${localStorage.getItem(this.storageKeys['weatherData'])}`).length > 10) { // Check if the data is too small to be valid
      this.weatherData = JSON.parse(localStorage.getItem(this.storageKeys['weatherData']) || '{}');
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
          localStorage.setItem(this.storageKeys['weatherData'], JSON.stringify(response));
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
      this.chartData.datasets[1].data = this.weatherData.daily.map(day => day.feels_like.day - this.KELVIN); // Convert Kelvin to Celsius
      this.chartData.datasets[2].data = this.weatherData.daily.map(day => day.humidity); // Humidity in percentage
      this.chartData.datasets[3].data = this.weatherData.daily.map(day => day.wind_speed); // Wind Speed in m/s
      this.chartData.datasets[4].data = this.weatherData.daily.map(day => day.pressure / 10); // Pressure in Pa
      this.chartData.datasets[5].data = this.weatherData.daily.map(day => day.dew_point - this.KELVIN); // Convert Kelvin to Celsius
      this.chartData.datasets[6].data = this.weatherData.daily.map(day => day.uvi); // UV Index
  
    }
  }

  protected switchLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
