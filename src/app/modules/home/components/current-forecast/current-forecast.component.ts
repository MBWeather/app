import { Component, Input, OnInit } from '@angular/core';
import { CurrentWeather, WeatherApiResponse } from 'src/app/types/weather';

import * as constants from 'src/app/@mbweather/constants';

@Component({
  selector: 'app-current-forecast',
  templateUrl: './current-forecast.component.html',
  styleUrls: ['./current-forecast.component.scss'],
})
export class CurrentForecastComponent  implements OnInit {
  protected readonly getConst = constants;

  @Input() public currentWeather!: CurrentWeather; // The current weather data

  constructor() { }

  ngOnInit() {}

}
