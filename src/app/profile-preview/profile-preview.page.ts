import { NavController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PopupPage } from '../popup/popup.page';
@Component({
  selector: 'app-profile-preview',
  templateUrl: './profile-preview.page.html',
  styleUrls: ['./profile-preview.page.scss'],
})
export class ProfilePreviewPage implements OnInit {

  constructor(public location: Location,
    public navCtrl: NavController,
    public modal: ModalController) { }

  ngOnInit() {
  }

  goback() {
    this.location.back();
  }
  editprofile() {
    this.navCtrl.navigateRoot('profile');

  }

  tablink(type) {
    if (type == 1) {
      this.navCtrl.navigateRoot('dashboard');
    }
    if (type == 2) {
      this.navCtrl.navigateRoot('findajob');
    }
    if (type == 3) {
      this.navCtrl.navigateRoot('savedjobs');
    }
    if (type == 4) {
      this.navCtrl.navigateRoot('profile-preview');
    }
    if (type == 5) {
      this.navCtrl.navigateRoot('settings');
    }
  }

  async openpopup() {
    const modal = await this.modal.create({
      component: PopupPage,
      cssClass: 'popupclass',
    });
    modal.onDidDismiss().then((data) => {
      console.log('data', data)
    });
    return await modal.present();
  }
}
