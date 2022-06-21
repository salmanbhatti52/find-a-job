import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-safe-jobs',
  templateUrl: './safe-jobs.page.html',
  styleUrls: ['./safe-jobs.page.scss'],
})
export class SafeJobsPage implements OnInit {
  cover_image: ''
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
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
