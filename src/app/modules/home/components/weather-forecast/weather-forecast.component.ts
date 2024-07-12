import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { WeatherApiResponse } from 'src/app/types/weather';

import { Location } from '../../../../types/location';
import * as constants from 'src/app/@mbweather/constants';
import { ChartService } from 'src/app/services/chart/chart.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForcastComponent implements OnChanges {
  protected readonly getConst = constants;

  protected lastUpdated!: Date;

  /**
   * The chart data
   * @protected
   * @type {{
   *    data: ChartData<'line'>;
   *    options: ChartOptions;
   * }}
   */
  protected chart!: {
    data: ChartData<'line'>;
    options: ChartOptions;
  };

  @Input() public location!: Location; // The location of the weather data
  @Input() public weatherData!: WeatherApiResponse | null; // The weather data to display

  /**
   * 
   * @param apiService Service for fetching data from the API
   * @param translate Service for translating text to different languages
   */
  constructor(
    private chartService: ChartService,
  ) { }

  /**
   * On changes to the weather data, prepare the chart data
   * @param changes The changes to the input data
   * @returns void
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['weatherData'] && this.weatherData) {
      this.lastUpdated = new Date();

      this.chart = {
        data: this.chartService.prepareChartData(this.weatherData),
        options: this.getConst.DEFAULT_CHART_OPTIONS as ChartOptions
      }
    }
  }
}
