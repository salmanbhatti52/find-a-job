import { NavController } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.page.html',
  styleUrls: ['./company-details.page.scss'],
})
export class CompanyDetailsPage implements OnInit {
  @ViewChild('mySegment', { read: ElementRef }) private mySegment: ElementRef;
  requestsType: any;
  jobssection = false
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
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
