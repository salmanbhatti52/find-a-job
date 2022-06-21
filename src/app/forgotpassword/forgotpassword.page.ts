import { NavController, MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  count = 0;
  displayEmailSend = true;
  displayPinCode = false;
  displayChangePassword = false;
  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menuCtrl.enable(true);
  }
  sendEmail() {
    this.displayEmailSend = false;
    this.displayPinCode = true;
  }
  ok() {
    this.displayChangePassword = true;
    this.displayPinCode = false;
  }
  back() {
    if (this.displayEmailSend) {
      this.navCtrl.navigateRoot('signin');
    }
    if (this.displayPinCode) {
      this.displayEmailSend = true;
      this.displayPinCode = false;
    }
    if (this.displayChangePassword) {
      this.displayPinCode = true;
      this.displayChangePassword = false;
    }
  }
  next(e, elNext, elBack) {
    if (e.keyCode === 8) {
      this.count++;
      if (this.count === 2) {
        elBack.setFocus();
        this.count = 0;
      }
    } else {
      elNext.setFocus();
    }
  }
  reset() {
    this.navCtrl.navigateRoot('signin');
  }

}
