import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  oldpass = '';
  newpass = '';
  confirmpass = '';

  constructor(public navCtrl: NavController,
    public rest: RestService,
    public extra: ExtrasService) { }

  ngOnInit() {
  }


  save() {
    if (this.oldpass == '') {
      this.extra.presentToast('old password field is required')
    }
    else if (this.newpass == '') {
      this.extra.presentToast('new password field is required')
    } else if (this.confirmpass == '') {
      this.extra.presentToast('confirm password field is required')
    } else {
      let datasend = {
        oldpassword: this.oldpass,
        newpassword: this.newpass,
        password_confirmation: this.confirmpass
      }
      this.rest.sendRequest('new-password', datasend, localStorage.getItem('auth_token')).subscribe((res: any) => {
        console.log('respnse===', res);
        if (res.status == 'true') {
          this.oldpass == '';
          this.newpass == '';
          this.confirmpass == '';
          this.extra.presentToast(res.message);
        } else {
          this.extra.presentToast(res.message);
        }
      }, err => {

      })
    }

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

}
