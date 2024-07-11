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

  constructor(
    private translate: TranslateService
  ) {
        // Available languages
        translate.addLangs(LANGUAGES.available.map(lang => lang.short));
        // Set the default language
        translate.setDefaultLang(LANGUAGES.default);
        // Set the language based on the browser language
        translate.use(this.browserLang.match(langRegEx) ? this.browserLang : LANGUAGES.default);
  }
}
