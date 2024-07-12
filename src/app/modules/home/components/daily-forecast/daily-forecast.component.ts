import { Component, Input, OnInit } from '@angular/core';
import { DailyWeather } from 'src/app/types/weather';

import * as constants from 'src/app/@mbweather/constants';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss'],
})
export class DailyForecastComponent  implements OnInit {
  protected readonly getConst = constants;

  @Input() public dailyForecast!: DailyWeather;

  constructor() { }

  ngOnInit() {}

}
