import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/types/location';
import * as constants from 'src/app/@mbweather/constants';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { WeatherApiResponse } from 'src/app/types/weather';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  protected readonly getConst = constants;

  protected location: Location = {
    city: 'Maribor',
    country: 'Slovenia',
    coordinates: {
      lat: 46.5547,
      lon: 15.6459
    }
  };

  constructor(
    private weatherService: WeatherService,
  ) {}

  public ngOnInit(): void {
    this.weatherService.getWeatherData(this.location.coordinates.lat, this.location.coordinates.lon).subscribe((data: WeatherApiResponse) => {
      console.log("The data is:", data);
    });
  }

  public ngOnDestroy(): void {
  }
}
