import { Injectable } from '@angular/core';
import { ChartData } from 'chart.js';
import { WeatherApiResponse } from './../../types/weather';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private readonly MILLISECONDS = environment.app.config.constants.MILLISECONDS;
  private readonly KELVIN = environment.app.config.constants.KELVIN;

  prepareChartData(weatherData: WeatherApiResponse): ChartData<'line'> {
    // If there is no data, return an empty object
    if (!weatherData.daily) return { datasets: [], labels: [] };

    // Prepare the chart data
    return {
      datasets: [
        {
          data: weatherData.daily.map(day => day.temp.day - this.KELVIN),
          label: 'Temperature',
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          data: weatherData.daily.map(day => day.feels_like.day - this.KELVIN),
          label: 'Feels Like Temperature',
          fill: false,
          borderColor: '#ff6384'
        },
        {
          data: weatherData.daily.map(day => day.humidity),
          label: 'Humidity',
          fill: false,
          borderColor: '#36a2eb'
        },
        {
          data: weatherData.daily.map(day => day.wind_speed),
          label: 'Wind Speed',
          fill: false,
          borderColor: '#ffcd56'
        },
        {
          data: weatherData.daily.map(day => day.pressure / 10),
          label: 'Pressure',
          fill: false,
          borderColor: '#9966ff'
        },
        {
          data: weatherData.daily.map(day => day.dew_point - this.KELVIN),
          label: 'Dew Point',
          fill: false,
          borderColor: '#ff9f40'
        },
        {
          data: weatherData.daily.map(day => day.uvi),
          label: 'UV Index',
          fill: false,
          borderColor: '#4bc0c0'
        }
      ],
      labels: weatherData.daily.map(day => new Date(day.dt * this.MILLISECONDS).toLocaleDateString())
    };
  }
}
