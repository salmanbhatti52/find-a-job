import { NavController, Platform } from '@ionic/angular';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RestService } from '../services/rest.service';
import * as moment from 'moment';
import { ExtrasService } from '../services/extras.service';
@Component({
  selector: 'app-application',
  templateUrl: './application.page.html',
  styleUrls: ['./application.page.scss'],
})
export class ApplicationPage implements OnInit {
  dropdown = false;
  userId: any;
  jobsarray = [];
  footerhide = false;
  constructor(public navCtrl: NavController,
    public rest: RestService,
    public platform: Platform,
    public cd: ChangeDetectorRef,
    public extra: ExtrasService) { }

  ngOnInit() {

    this.platform.keyboardDidShow.subscribe(ev => {
      console.log('keyboard show', ev);
      this.footerhide = true;
      this.cd.detectChanges();

    });


    this.platform.keyboardDidHide.subscribe(ev => {
      this.footerhide = false;

      this.cd.detectChanges();
      console.log('keyboard hide');

    });

    this.userId = localStorage.getItem('userid');
    console.log(localStorage.getItem('auth_token'));

    this.getapplications(this.userId)
  }


  getapplications(uid) {
    this.extra.loadershow()
    this.rest.getRequest('applications/' + uid, localStorage.getItem('auth_token')).subscribe((res: any) => {

      console.log('response-===--', res);
      this.extra.hideLoader()
      for (var i = 0; i < res.applications.length; i++) {
        this.rest.getRequest('getjob/' + res.applications[i].job_id, localStorage.getItem('auth_token')).subscribe((resdata: any) => {
          this.extra.hideLoader()
          console.log('resdata-===--', resdata);

          let data = {
            title: resdata.job.title,
            industry: resdata.job.industry,
            status: resdata.job.status,
            role: resdata.job.slug,
            monthly_salary: resdata.job.monthly_salary,
            dateapplied: moment(resdata.job.created_at).format('YYYY-MM-DD')
          }
          this.jobsarray.push(data)



          console.log('dasd', this.jobsarray);
        })



      }

    })
  }
  // open() {
  //   if (this.dropdown == false) {
  //     this.dropdown = true
  //   } else {
  //     this.dropdown = false
  //   }

  // }

  open(index, list) {
    console.log('ddg', index);

    // console.log('index number', index);
    // console.log('list', list);
    this.jobsarray[index].isdown = !(this.jobsarray[index].isdown);

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
