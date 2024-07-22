import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from 'src/app/types/location';
import * as constants from 'src/app/@mbweather/constants';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { WeatherApiResponse } from 'src/app/types/weather';
import { Observable, shareReplay, Subscription, tap } from 'rxjs';
import { IonPullUpFooterState } from 'ionic-pullup';

import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';
import { AlertService } from 'src/app/services/alert/alert.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { AlertInput } from '@ionic/angular';
import { MBWTranslatePipe } from 'src/app/@mbweather/pipes/translate/translate.pipe';
import { ToastService } from 'src/app/services/toast/toast.service';

register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  protected readonly getConst = constants;

  protected loading: boolean = true;
  protected location: Location = this.getConst.DEFAULT_LOCATION;
  protected lastUpdated!: Date;
  protected activeSegment: String = 'hourly';

  public weatherData$!: Observable<WeatherApiResponse>;
  private subscription!: Subscription;

  /**
   * Creates an instance of HomePage.
   * @param weatherService The weather service
   * @memberof HomePage
   */
  constructor(
    private weatherService: WeatherService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private mbwTranslatePipe: MBWTranslatePipe,
    private toastService: ToastService
  ) {
    this.getWeatherData();
  }

  /**
   * Initialize the component.
   * @public
   * @returns void
   */
  public ngOnInit(): void {
    this.pullUpState = IonPullUpFooterState.Collapsed;
  }

  public ngAfterViewInit(): void {
    this.swiperReady();
  }

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
      tap(() => {
        this.lastUpdated = new Date();
        this.loading = false
      }) // Hide the loading spinner
    ); // Share the data between multiple subscribers, don't re-fetch the data

    // Subscribe to the weather data
    this.subscription = this.weatherData$.subscribe();
  }

  protected pullUpState: IonPullUpFooterState;

  @ViewChild('swiper')
  private swiperRef: ElementRef | undefined;
  private swiper?: Swiper;

  /**
  * Toggle the footer.
  * @protected
  * @returns void
  */
  protected toggleDrawer(): void {
    this.pullUpState = this.pullUpState === IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
  }

  /**
   * Swiper ready event.
   * @private
   * @returns void
   */
  private swiperReady(): void {
    this.swiper = this.swiperRef.nativeElement.swiper;
  }

  /**
   * Slide to the hourly forecast.
   * @protected
   * @returns void
   */
  protected hourlyForecast(): void {
    this.swiper.slideTo(0);
  }

  /**
   * Slide to the weekly forecast.
   * @protected
   * @returns void
   */
  protected weeklyForecast(): void {
    this.swiper.slideTo(1);
  }

  /**
   * Slide change event. Update the active segment accordingly.
   * @protected
   * @returns void
   */
  protected onSlideChange(): void {
    this.activeSegment = this.swiper.activeIndex === 0 ? 'hourly' : 'weekly';
  }

  /**
   * Slide change event. Update the active segment accordingly.
   * @protected
   * @returns void
   */
  protected drawerExpand(): void {
    console.log("Drawer expanded");
  }

  
  /**
   * Slide change event. Update the active segment accordingly.
   * @protected
   * @returns void
   */
  protected drawerCollapse(): void {
    console.log("Drawer collapsed");
  }

  /**
   * Toggle the menu.
   * @protected
   * @returns void
   */
  protected toggleMenu(): void {

    const inputs: AlertInput[] = environment.app.config.languages.available.map(lang => {
      return {
        name: lang.short,
        type: 'radio',
        label: this.mbwTranslatePipe.transform(lang.name),
        value: lang.short,
        checked: this.translateService.currentLang === lang.short,
        handler: () => {
          this.translateService.use(lang.short);
        }
      };
    });

    this.alertService.presentAlert({
      header: this.mbwTranslatePipe.transform('app.languages'),
      inputs: [...inputs],
      buttons: [{
        text: this.mbwTranslatePipe.transform('app.save'),
        handler: () => {
          this.toastService.showToast({
            message: this.mbwTranslatePipe.transform('app.language-changed'),
            duration: 2000,
            color: 'weather-primary',
            position: 'top',
            translucent: true,
            cssClass: ['custom-toast']
          });
        }
      }]
    });
  }

  /**
   * Toggle the location.
   * @protected
   * @returns void
   */
  protected toggleLocation(): void {
    console.log("Toggle Location");
  }
}
