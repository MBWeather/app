import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';

const PROVIDERS = [
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  provideHttpClient()
];

const IMPORTS = [
  BrowserModule,
  IonicModule.forRoot(),
  AppRoutingModule
];

const DECLARATIONS = [AppComponent];

@NgModule({
  declarations: DECLARATIONS,
  imports: IMPORTS,
  providers: [...PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
