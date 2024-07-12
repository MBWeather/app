import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import * as constants from 'src/app/@mbweather/constants';
import { Language } from 'src/app/types/langauges';

@Component({
  selector: 'app-langauge-selector',
  templateUrl: './langauge-selector.component.html',
  styleUrls: ['./langauge-selector.component.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LangaugeSelectorComponent  implements OnInit {
  protected readonly getConst = constants;

  constructor(
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {}

  protected changeLanguage(lang: Language): void {
    this.translate.use(lang.short);
  }
}
