import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

import * as constants from 'src/app/@mbweather/constants';

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

  constructor() { }

  ngOnInit() {}

}
