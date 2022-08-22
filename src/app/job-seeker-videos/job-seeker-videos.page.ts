import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';
import * as moment from 'moment';
@Component({
  selector: 'app-job-seeker-videos',
  templateUrl: './job-seeker-videos.page.html',
  styleUrls: ['./job-seeker-videos.page.scss'],
})
export class JobSeekerVideosPage implements OnInit {
  videos = [];

  constructor(public navCtrl: NavController,
    public rest: RestService,
    public extra: ExtrasService) { }

  ngOnInit() {
    this.Jobseekervideos()


  }

  Jobseekervideos() {
    this.rest.getRequest('job-seeker-videos', localStorage.getItem('auth_token')).subscribe((res: any) => {

      console.log('response-===--', res);
      res.videos.forEach(ele => {
        let data = {
          title: ele.title,
          link: ele.link,
          date: moment(ele.created_at).format('DD MMM, YYYY')
        }
        this.videos.push(data)
      });
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
