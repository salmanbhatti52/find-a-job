import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-jobappointment',
  templateUrl: './jobappointment.page.html',
  styleUrls: ['./jobappointment.page.scss'],
})
export class JobappointmentPage implements OnInit {
  @ViewChild('mySegment', { read: ElementRef }) private mySegment: ElementRef;
  requestsType: any;
  dropdown = false;
  constructor(public location: Location,
    public navCtrl: NavController) { }

  ngOnInit() {
  }
  goback() {
    this.location.back();
  }
  ionViewWillEnter() {
    if (this.requestsType) {
      if (this.requestsType === 'BookAppointments') {
        this.mySegment.nativeElement.children[0].click();

      }
      if (this.requestsType === 'MyBookings') {
        this.mySegment.nativeElement.children[1].click();

      }
    } else {
      this.requestsType = 'BookAppointments';
      this.mySegment.nativeElement.children[0].click();

    }
  }
  segmentChanged(ev) {
    console.log('requestType value', ev.detail.value);
    let data = ev.detail.value;
    this.requestsType = data
    if (ev.detail.value === 'BookAppointments') {
      this.requestsType = 'BookAppointments';

    }
    if (ev.detail.value === 'MyBookings') {
      this.requestsType = 'MyBookings';
    }
    localStorage.setItem('requestType', this.requestsType);
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
