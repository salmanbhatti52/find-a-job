import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-training-directory',
  templateUrl: './training-directory.page.html',
  styleUrls: ['./training-directory.page.scss'],
})
export class TrainingDirectoryPage implements OnInit {
  slideOpts = {
    spaceBetween: 0,
    slidesPerView: 1.3,
    centeredSlides: true,
    initialSlide: 1,
    speed: 400
  };

  trainings = [];
  constructor(public navCtrl: NavController,
    public rest: RestService) { }

  ngOnInit() {
    this.gettranings()
  }


  gettranings() {
    this.rest.getRequest('trainings', localStorage.getItem('auth_token')).subscribe((data: any) => {
      console.log('training data--', data);
      this.trainings = data.trainings
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
