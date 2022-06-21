import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.page.html',
  styleUrls: ['./interviews.page.scss'],
})
export class InterviewsPage implements OnInit {
  msgsList1 = [
    {
      image: "assets/imgs/man13.jpeg",
    }
    , {

      image: "assets/imgs/man13.jpeg",

    }
    , {

      image: "assets/imgs/man13.jpeg",

    }
    , {

      image: "assets/imgs/man13.jpeg",

    }
    , {

      image: "assets/imgs/man13.jpeg",

    }

  ]
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
