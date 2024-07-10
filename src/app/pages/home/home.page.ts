import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private apiService: ApiService
  ) {}

  public ngOnInit(): void {
    console.log('Hello, World!');

    this.apiService.get('3.0/onecall', {
      lat: '33.44',
      lon: '-94.04'
    })?.subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
