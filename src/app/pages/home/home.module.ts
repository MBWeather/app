import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { WeatherForcastComponent } from 'src/app/components/weather-forecast/weather-forecast.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { TranslateModule } from '@ngx-translate/core';
import { CurrentForecastComponent } from 'src/app/components/current-forecast/current-forecast.component';
import { DailyForecastComponent } from 'src/app/components/daily-forecast/daily-forecast.component';

const IMPORTS = [
  CommonModule,
  FormsModule,
  IonicModule,
  HomePageRoutingModule,
  BaseChartDirective,
  TranslateModule
];

const DECLARATIONS = [
  HomePage, 
  WeatherForcastComponent,
  CurrentForecastComponent,
  DailyForecastComponent
];

const PROVIDERS = [
  provideCharts(withDefaultRegisterables())
];

@NgModule({
  imports: IMPORTS,
  declarations: DECLARATIONS,
  providers: PROVIDERS
})
export class HomePageModule {}
