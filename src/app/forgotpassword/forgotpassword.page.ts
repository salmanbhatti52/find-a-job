import { NavController, MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';

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

  email = '';
  emailError = {
    status: false,
    message: "",
  };
  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public rest: RestService,
    public loading: ExtrasService) { }

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
    if (this.email) {
      if (!this.validateEmail(this.email)) {
        this.loading.presentToast("Invalid Email address.")
      }

      let Data = {
        email: this.email
      }
      this.rest.sendRequest("forgot-password", Data).subscribe(
        (data: any) => {
          console.log('forgot_password data', data);
          // if (data.status == 'Success') {
          //   this.displayEmailSend = false;
          //   this.displayPinCode = true;
          // }
          // if (data.status == 'error') {
          //   this.loading.hideLoader();
          //   // console.log('signup request data:',data.status);
          // }

        }, (err) => {

        }
      );

    }
    if (!this.email) {
      this.loading.presentToast("Email address is required");
    }

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

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  reset() {
    this.navCtrl.navigateRoot('signin');
  }

}
