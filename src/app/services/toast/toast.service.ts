import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  /**
   * Presents a toast message with the specified options.
   * @param options - The options for the toast message.
   */
  public async showToast(options: ToastOptions): Promise<void> {
    const toast = await this.toastController.create({
      message: options.message,
      duration: options.duration || 2000, // Default duration to 2000ms
      position: options.position || 'bottom', // Default position
      color: options.color,
      header: options.header,
      buttons: options.buttons || []
    });

    await toast.present();
  }
}