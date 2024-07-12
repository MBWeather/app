import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/types/location';
import * as constants from 'src/app/@mbweather/constants';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { WeatherApiResponse } from 'src/app/types/weather';
import { Observable, shareReplay, Subscription } from 'rxjs';

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

  public weatherData$!: Observable<WeatherApiResponse>;
  private subscription!: Subscription;

  constructor(private weatherService: WeatherService) {
    this.weatherData$ = this.weatherService.getWeatherData(
      this.location.coordinates.lat, this.location.coordinates.lon
    ).pipe(shareReplay(1)); // Share the data between multiple subscribers, don't re-fetch the data

    // Subscribe to the weather data
    this.subscription = this.weatherData$.subscribe();
  }

  public ngOnInit(): void { }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
