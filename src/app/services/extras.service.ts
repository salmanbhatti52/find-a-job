import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ExtrasService {
  toast: any;
  loading: any;
  constructor(private toastCtrl: ToastController,
    public loadingCtrl: LoadingController) { }


  async presentToast(message) {


    this.toast = true;
    return await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    }).then(a => {

      a.present().then(() => {
        console.log('presented');
        if (!this.toast) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });

    });
  }

  async loadershow(content?: string) {

    this.loadingCtrl.create({
      cssClass: 'loadingdiv',
      message: '',
      // duration: 2000
    }).then((res) => {
      res.present();
    });

  }

  hideLoader() {

    this.loadingCtrl.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });

  }
}
