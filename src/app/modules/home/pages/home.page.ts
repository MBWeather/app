import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/types/location';
import * as constants from 'src/app/@mbweather/constants';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { WeatherApiResponse } from 'src/app/types/weather';
import { BehaviorSubject, Observable, shareReplay, Subject, Subscription, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  protected readonly getConst = constants;

  protected location: Location = this.getConst.DEFAULT_LOCATION;

  protected readonly weatherData$: Observable<WeatherApiResponse>;
  private readonly loadingSubject = new BehaviorSubject<boolean>(true);
  protected readonly loading$ = this.loadingSubject.asObservable();

  private readonly destroy$ = new Subject<void>();

  /**
   * Creates an instance of HomePage.
   * @param weatherService The weather service
   * @memberof HomePage
   */
  constructor(private weatherService: WeatherService) {
    this.weatherData$ = this.weatherService.getWeatherData(
      this.location.coordinates.lat, this.location.coordinates.lon
    ).pipe(
      shareReplay(1),
      tap(() => {
        this.loadingSubject.next(false);
        console.log('Weather data fetched');
      }),
      takeUntil(this.destroy$)
    );
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
    this.destroy$.next(); // Unsubscribe from the weather data
    this.destroy$.complete(); // Complete the subject to avoid memory leaks
  }

  /**
   * Toggle the refresh of the weather data.
   * @protected
   * @returns void
   */
  protected toggleRefresh(): void {
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
   * Get the weather data.
   * @private
   * @returns void
   */
  private getWeatherData(): void {
    // Show the loading spinner
    this.loadingSubject.next(true);

    // Fetch the weather data
    this.weatherService.getWeatherData(
      this.location.coordinates.lat, this.location.coordinates.lon
    ).pipe(
      shareReplay(1), // Share the data between multiple subscribers, don't re-fetch the data
      tap(() => this.loadingSubject.next(false)), // Hide the loading spinner
      takeUntil(this.destroy$)
    ).subscribe();
  }
}
