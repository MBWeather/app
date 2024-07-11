import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './home-routing.module';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { TranslateModule } from '@ngx-translate/core';
import { HomePage } from './pages/home.page';
import { WeatherForcastComponent } from './components/weather-forecast/weather-forecast.component';
import { CurrentForecastComponent } from './components/current-forecast/current-forecast.component';
import { DailyForecastComponent } from './components/daily-forecast/daily-forecast.component';

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
