import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { langRegEx, LANGUAGES } from './@mbweather/constants';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private readonly browserLang: string = `${this.translate.getBrowserLang()}`;

  /**
   * Creates an instance of AppComponent
   * @param {TranslateService} translate
   * @memberof AppComponent
   */
  constructor(
    private translate: TranslateService
  ) {
    this.setLanguage();
  }

  /**
   * Set the language for the app
   * @returns void
   * @private
   * @memberof AppComponent
   * @since 1.0.0
   * @version 1.0.0
   * @example
   * setLanguage();
   */
  private setLanguage(): void {
    // Available languages
    this.translate.addLangs(LANGUAGES.available.map(lang => lang.short));
    
    // Set the default language
    this.translate.setDefaultLang(LANGUAGES.default);
    
    // Set the language based on the browser language
    this.translate.use(this.browserLang.match(langRegEx) ? this.browserLang : LANGUAGES.default);
  }
}
