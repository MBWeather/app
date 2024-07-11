import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApiKeyInterceptor } from './interceptors/api-key.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

const PROVIDERS = [
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
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
