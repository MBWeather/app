import { DatePipe, DecimalPipe, JsonPipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CurrentWeather, WeatherApiResponse } from 'src/app/types/weather';

import * as constants from '../../constants';
import { LineChartComponent } from 'src/app/modules/home/components/line-chart/line-chart.component';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartService } from 'src/app/services/chart/chart.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  standalone: true,
  imports: [
    JsonPipe,
    DatePipe,
    DecimalPipe,
    LineChartComponent
  ]
})
export class DrawerComponent  implements OnInit {
  protected readonly getConst = constants;

  @Input() public data!: WeatherApiResponse;

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

  constructor(
    private chartService: ChartService,
  ) { }

  public ngOnInit(): void {
    
  }

    /**
   * On changes to the weather data, prepare the chart data
   * @param changes The changes to the input data
   * @returns void
   */
    public ngOnChanges(changes: SimpleChanges): void {
      if (changes['data'] && this.data) {  
        this.chart = {
          data: this.chartService.prepareChartData(this.data),
          options: this.getConst.DEFAULT_CHART_OPTIONS as ChartOptions
        }
      }
    }
}
