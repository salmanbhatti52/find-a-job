import { MessagePage } from './../message/message.page';
import { RestService } from './../services/rest.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ExtrasService } from '../services/extras.service';
@Component({
  selector: 'app-savedjobs',
  templateUrl: './savedjobs.page.html',
  styleUrls: ['./savedjobs.page.scss'],
})
export class SavedjobsPage implements OnInit {

  constructor(public navCtrl: NavController,
    public rest: RestService,
    public extra: ExtrasService) { }

  ngOnInit() {
    this.getsavedjobs();
  }


  getsavedjobs() {
    this.rest.getRequest('saved-jobs', localStorage.getItem('auth_token')).subscribe((res: any) => {
      console.log('saved jobs====', res);

    }, err => {
      console.log('error saved jobs====', err);
      this.extra.presentToast(err.error.message)
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
