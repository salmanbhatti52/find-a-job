import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportascam',
  templateUrl: './reportascam.page.html',
  styleUrls: ['./reportascam.page.scss'],
})
export class ReportascamPage implements OnInit {
  droplist = false
  list = [
    { name: 'Fake job advert', status: 'unchecked' }, { name: 'Pay for job scam', status: 'unchecked' }, { name: 'Unacceptable behaviour', status: 'checked' }, { name: 'Other', status: 'unchecked' }
  ]
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  openlist() {
    if (this.droplist == false) {
      this.droplist = true
    } else {
      this.droplist = false
    }
  }
  select(ls) {
    if (ls.status == 'checked') {
      ls.status = 'unchecked';
    } else {
      ls.status = 'checked';
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
