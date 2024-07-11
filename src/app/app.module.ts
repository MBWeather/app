import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http'; // This was a tricky little import until it wasn't
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { apiKeyInterceptor } from './interceptors/api-key/api-key.interceptor';
import { errorInterceptor } from './interceptors/error/error.interceptor';

const PROVIDERS = [
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  provideHttpClient(
    withInterceptors([
      apiKeyInterceptor,
      errorInterceptor
    ])
  ),
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
