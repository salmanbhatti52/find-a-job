import { NavController } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-raffletickets',
  templateUrl: './raffletickets.page.html',
  styleUrls: ['./raffletickets.page.scss'],
})
export class RaffleticketsPage implements OnInit {
  @ViewChild('mySegment', { read: ElementRef }) private mySegment: ElementRef;
  constructor(public navCtrl: NavController) { }
  checkSegment: any;
  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.checkSegment) {
      if (this.checkSegment === 'about') {
        this.mySegment.nativeElement.children[0].click();

      }
      if (this.checkSegment === 'jobs') {
        this.mySegment.nativeElement.children[1].click();
      }
    } else {
      this.checkSegment = 'about';
      this.mySegment.nativeElement.children[0].click();

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
