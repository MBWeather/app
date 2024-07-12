import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ApiService } from 'src/app/services/api/api.service';
import { WeatherApiResponse } from 'src/app/types/weather';

import { Location } from '../../../../types/location';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { Langauges } from 'src/app/types/langauges';
import * as constants from 'src/app/@mbweather/constants';
import { ChartService } from 'src/app/services/chart/chart.service';
import { WeatherService } from 'src/app/services/weather/weather.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForcastComponent implements OnChanges {
  protected readonly getConst = constants;

  protected lastUpdated!: Date;
  protected chart!: {
    data: ChartData<'line'>;
    options: ChartOptions;
  };

  @Input() public location!: Location;
  @Input() public weatherData!: WeatherApiResponse | null;

  /**
   * 
   * @param apiService Service for fetching data from the API
   * @param translate Service for translating text to different languages
   */
  constructor(
    private chartService: ChartService,
  ) { }

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
