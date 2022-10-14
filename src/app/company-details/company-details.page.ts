import { NavController } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.page.html',
  styleUrls: ['./company-details.page.scss'],
})
export class CompanyDetailsPage implements OnInit {
  @ViewChild('mySegment', { read: ElementRef }) private mySegment: ElementRef;
  requestsType: any;
  jobssection = false
  companyid: any;
  details: any;
  phonenumber: any;
  jobs: any;
  constructor(public navCtrl: NavController,
    public rest: RestService,
    public extra: ExtrasService,
    public location: Location) { }

  ngOnInit() {
    this.companyid = this.rest.companyid
    this.companydetail(this.companyid);
  }

  goback() {
    this.location.back();
  }
  ionViewWillEnter() {
    if (this.requestsType) {
      if (this.requestsType === 'about') {
        this.mySegment.nativeElement.children[0].click();
        this.jobssection = false;
      }
      if (this.requestsType === 'jobs') {
        this.mySegment.nativeElement.children[1].click();
        this.jobssection = true;
      }
    } else {
      this.requestsType = 'about';
      this.mySegment.nativeElement.children[0].click();
      this.jobssection = false;
    }
  }
  companydetail(id) {
    this.extra.loadershow();
    this.rest.getRequest('getemployer', localStorage.getItem('auth_token'), id).subscribe((res: any) => {
      console.log('company detail====', res);
      this.extra.hideLoader();
      this.phonenumber = res.employer[0].phone
      this.details = res.profile
      this.jobs = res.jobs
    })
  }
  segmentChanged(ev) {
    console.log('requestType value', ev.detail.value);
    let data = ev.detail.value;
    this.requestsType = data
    if (ev.detail.value === 'jobs') {
      this.requestsType = 'jobs';
      this.jobssection = true;
    }
    if (ev.detail.value === 'about') {
      this.requestsType = 'about';
      this.jobssection = false;
    }
    localStorage.setItem('requestType', this.requestsType);
  }


  goto(job) {
    localStorage.setItem('jobid', job.id);
    this.navCtrl.navigateForward('job-detail');
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
