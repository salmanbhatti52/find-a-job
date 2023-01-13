import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.page.html',
  styleUrls: ['./application.page.scss'],
})
export class ApplicationPage implements OnInit {
  dropdown = false;
  userId: any;
  constructor(public navCtrl: NavController,
    public rest: RestService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userid');
    console.log(localStorage.getItem('auth_token'));

    this.getapplications(this.userId)
  }


  getapplications(uid) {
    this.rest.getRequest('applications/' + uid, localStorage.getItem('auth_token')).subscribe((res: any) => {

      console.log('response-===--', res);

    })
  }
  open() {
    if (this.dropdown == false) {
      this.dropdown = true
    } else {
      this.dropdown = false
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
