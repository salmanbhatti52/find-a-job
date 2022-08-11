import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';
@Component({
  selector: 'app-jobalert',
  templateUrl: './jobalert.page.html',
  styleUrls: ['./jobalert.page.scss'],
})
export class JobalertPage implements OnInit {
  jobrole: any;
  joblocation: any;
  constructor(public location: Location,
    public navCtrl: NavController,
    public rest: RestService,
    public extra: ExtrasService) { }

  ngOnInit() {
  }

  goback() {
    this.location.back()
  }
  create() {
    this.extra.loadershow();
    let data = {
      role: this.jobrole,
      location: this.joblocation
    }
    this.rest.sendRequest('add-job-role-notification', data, localStorage.getItem('auth_token')).subscribe((res: any) => {
      if (res.status == 'true') {
        this.jobrole = '';
        this.joblocation = '';
        this.extra.hideLoader();
        this.extra.presentToast(res.message);
      } else {
        this.extra.hideLoader();
        this.extra.presentToast(res.message);
      }
    }, err => {
      this.extra.hideLoader();
    })
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
