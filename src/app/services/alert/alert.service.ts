import { Injectable } from '@angular/core';
import { AlertController, AlertOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  public async presentAlert(options: AlertOptions = {
    header: 'Alert',
    subHeader: 'Subtitle',
    message: 'This is an alert message.',
    buttons: ['OK']
  }): Promise<void> {
    const alert = await this.alertController.create({
      ...options,
      cssClass: ['custom-alert', options.cssClass instanceof Array ? options.cssClass.join(' ') : options.cssClass ]
    });

    await alert.present();
  }
}
