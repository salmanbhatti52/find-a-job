import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';
@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.page.html',
  styleUrls: ['./job-detail.page.scss'],
})
export class JobDetailPage implements OnInit {
  job_ID: any;
  title: any;
  industry: any;
  joblocation: any;
  monthly_salary: any;
  slug: any;
  level: any;
  summary: any;
  employer_id: any;
  user_ID: any;
  min_qualification: any;
  experience: any;
  deadline: any;
  requirements: any;
  constructor(public location: Location,
    public navCtrl: NavController,
    public rest: RestService,
    public extra: ExtrasService) {

  }

  ngOnInit() {

    this.user_ID = localStorage.getItem('userid');
    this.job_ID = localStorage.getItem('jobid');
    this.getjobdetail(this.job_ID);
  }

  getjobdetail(job_ID) {
    this.extra.loadershow();
    this.rest.getRequest('getjob', localStorage.getItem('auth_token'), job_ID).subscribe((data: any) => {
      console.log('jobs data==', data);
      this.extra.hideLoader();
      this.employer_id = data.job.employer_id
      this.title = data.job.title;
      this.industry = data.job.industry;
      this.min_qualification = data.job.min_qualification;
      this.experience = data.job.experience;
      this.deadline = data.job.deadline
      this.joblocation = data.job.location;
      this.monthly_salary = data.job.monthly_salary;
      this.slug = data.job.slug;
      this.level = data.job.level;
      this.summary = data.job.summary
      this.requirements = data.requirement
      // let strtoarray = data.job.requirement.split(' ')
      // console.log('strtoarray=', strtoarray);

    })
  }

  goback() {
    this.location.back();
  }

  sendmessage() {
    this.navCtrl.navigateForward('message');
  }

  applynow() {
    let data = {
      USER_ID: this.user_ID,
      JOB_ID: this.job_ID,
      EMPLOYER_ID: this.employer_id
    }
    this.rest.sendRequest('submitapplication', data,
      localStorage.getItem('auth_token')).subscribe((data: any) => {
        console.log('submit application data==', data);
      }, err => {
        console.log('errrorr==', err);
        this.extra.presentToast(err.error.message);

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
