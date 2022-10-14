import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';

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
  interviews: any;
  constructor(public navCtrl: NavController,
    public rest: RestService,
    public extra: ExtrasService) { }

  ngOnInit() {
    this.getinterviews()
  }

  getinterviews() {
    this.rest.getRequest('get-userinterview', localStorage.getItem('auth_token')).subscribe((data: any) => {
      console.log('interviews=====', data.interviews);
      this.interviews = data.interviews.length
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
