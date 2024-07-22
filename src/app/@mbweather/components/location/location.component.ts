import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class LocationComponent implements OnInit {
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss();
  }
}
