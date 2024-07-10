import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/types/location';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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
