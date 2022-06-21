import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-jobalert',
  templateUrl: './jobalert.page.html',
  styleUrls: ['./jobalert.page.scss'],
})
export class JobalertPage implements OnInit {

  constructor(public location: Location,
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  goback() {
    this.location.back()
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
