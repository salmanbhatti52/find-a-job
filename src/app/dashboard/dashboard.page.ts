import { NavController, MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
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
  jobs = [];
  userId: any;
  fullname: any;
  email: any;
  phone: any;
  nationality: any;
  userimg: any;
  userprofile: any;
  media: any;
  mediaarray = [];
  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public rest: RestService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userid');
    this.getuserdetails(this.userId)
    this.getjobs();
  }

  getuserdetails(userid) {
    this.rest.userdetail('getuser', userid, localStorage.getItem('auth_token')).subscribe((data: any) => {

      console.log('getuser data==', data);
      this.fullname = data.user.full_name;
      this.email = data.user.email;
      this.phone = data.user.phone;
      this.nationality = data.user.nationality;
      // if (data.user.profile_image == '' || data.user.profile_image == null) {
      //   this.userprofile = 'assets/imgs/profiledumy.svg';
      // } else {
      this.userprofile = data.user.profile_image;
      // }

    })
  }

  // getusers() {
  //   this.rest.getRequest('users', localStorage.getItem('auth_token')).subscribe((data: any) => {

  //     console.log('getusers data==', data);
  //     this.jobs = data.jobs

  //   })
  // }
  getjobs() {
    this.rest.getRequest('jobs', localStorage.getItem('auth_token')).subscribe((data: any) => {

      console.log('jobs data==', data);
      this.jobs = data.jobs

    })

  }

  seedetail(jobid) {
    localStorage.setItem('jobid', jobid)
    this.navCtrl.navigateForward('job-detail');
  }

  findjob() {
    this.navCtrl.navigateRoot('findajob');
  }

  jobalert() {
    this.navCtrl.navigateRoot('jobalert');
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
