import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const PROVIDERS = [
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  provideHttpClient()
];

const IMPORTS = [
  BrowserModule,
  IonicModule.forRoot(),
  AppRoutingModule,
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (http: HttpClient) => new TranslateHttpLoader(http), // This gave me a headache for a while
      deps: [HttpClient]
    }
  })
];

const DECLARATIONS = [AppComponent];

@NgModule({
  declarations: DECLARATIONS,
  imports: IMPORTS,
  providers: [...PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
