import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/types/location';
import * as constants from 'src/app/@mbweather/constants';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  protected readonly getConst = constants;

  protected location: Location = {
    city: 'Maribor',
    country: 'Slovenia',
    coordinates: {
      lat: 46.5547,
      lon: 15.6459
    }
  };

  constructor( ) {}
}
