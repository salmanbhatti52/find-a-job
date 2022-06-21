import { NavController } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-myresumes',
  templateUrl: './myresumes.page.html',
  styleUrls: ['./myresumes.page.scss'],
})
export class MyresumesPage implements OnInit {
  @ViewChild('mySegment', { read: ElementRef }) private mySegment: ElementRef;
  requestsType: any;
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    if (this.requestsType) {
      if (this.requestsType === 'UploadResumes') {
        this.mySegment.nativeElement.children[0].click();

      }
      if (this.requestsType === 'CoverLetter') {
        this.mySegment.nativeElement.children[1].click();

      }
    } else {
      this.requestsType = 'UploadResumes';
      this.mySegment.nativeElement.children[0].click();

    }
  }
  segmentChanged(ev) {
    console.log('requestType value', ev.detail.value);
    let data = ev.detail.value;
    this.requestsType = data
    if (ev.detail.value === 'UploadResumes') {
      this.requestsType = 'UploadResumes';

    }
    if (ev.detail.value === 'CoverLetter') {
      this.requestsType = 'CoverLetter';

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
