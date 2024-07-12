import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/types/location';
import * as constants from 'src/app/@mbweather/constants';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { WeatherApiResponse } from 'src/app/types/weather';
import { Observable, shareReplay, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  protected readonly getConst = constants;

  protected loading: boolean = true;
  protected location: Location = this.getConst.DEFAULT_LOCATION;

  public weatherData$!: Observable<WeatherApiResponse>;
  private subscription!: Subscription;

  /**
   * Creates an instance of HomePage.
   * @param weatherService The weather service
   * @memberof HomePage
   */
  constructor(private weatherService: WeatherService) {
    this.getWeatherData();
  }

  /**
   * Initialize the component.
   * @public
   * @returns void
   */
  public ngOnInit(): void { }

  /**
   * Unsubscribe from the weather data, on component destroy.
   * @public
   * @returns void
   */
  public ngOnDestroy(): void {
    this.unsubscribe();
  }

  /**
   * Toggle the refresh of the weather data.
   * @protected
   * @returns void
   */
  protected toggleRefresh(): void {
    // Unsubscribe from the weather data
    this.unsubscribe();

    // Re-fetch the data
    this.getWeatherData();
  }

  /**
   * Change the location of the weather data.
   * @todo Implement cool location change feature
   * @protected
   * @returns void
   */
  protected changeLocation(): void {
    /**
     * TODO: Implement cool location change feature
     **/ 
  }

  /**
   * Unsubscribe from the weather data.
   * @private
   * @returns void
   */
  private unsubscribe(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Get the weather data.
   * @private
   * @returns void
   */
  private getWeatherData(): void {
    // Show the loading spinner
    this.loading = true;
    
    // Fetch the weather data
    this.weatherData$ = this.weatherService.getWeatherData(
      this.location.coordinates.lat, this.location.coordinates.lon
    ).pipe(shareReplay(1)).pipe(
      tap(() => this.loading = false) // Hide the loading spinner
    ); // Share the data between multiple subscribers, don't re-fetch the data

    // Subscribe to the weather data
    this.subscription = this.weatherData$.subscribe();
  }
}
