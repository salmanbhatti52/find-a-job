import { NavController } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';

@Component({
  selector: 'app-raffletickets',
  templateUrl: './raffletickets.page.html',
  styleUrls: ['./raffletickets.page.scss'],
})
export class RaffleticketsPage implements OnInit {
  @ViewChild('mySegment', { read: ElementRef }) private mySegment: ElementRef;
  yourtickets: any;
  winticketstatus: any;
  constructor(public navCtrl: NavController,
    public rest: RestService,
    public extra: ExtrasService) { }
  checkSegment: any;
  ngOnInit() {

  }


  ionViewWillEnter() {
    if (this.checkSegment) {
      alert(this.checkSegment)
      if (this.checkSegment === 'Raffle') {
        this.mySegment.nativeElement.children[0].click();

      }
      if (this.checkSegment === 'Wins') {
        this.mySegment.nativeElement.children[1].click();
      }
    } else {
      this.checkSegment = 'Raffle';
      this.mySegment.nativeElement.children[0].click();

    }
  }

  segmentChanged(ev) {
    console.log('requestType value', ev.detail.value);
    let data = ev.detail.value;
    this.checkSegment = data
    if (ev.detail.value === 'Raffle') {
      this.checkSegment = 'Raffle';
      this.tickets()
    }
    if (ev.detail.value === 'Wins') {
      this.checkSegment = 'Wins';
      this.wintickets()
    }
    localStorage.setItem('requestType', this.checkSegment);
  }

  tickets() {
    this.extra.loadershow();
    this.rest.getRequest('customerticket', localStorage.getItem('auth_token')).subscribe((res: any) => {
      console.log('ticket response----', res);
      if (res.status == "success") {
        this.yourtickets = res.tickets
        this.extra.hideLoader()

      }
      if (res.status == "error") {
        this.extra.presentToast(res.message)
        this.extra.hideLoader()

      }
    }, (err) => {
      this.extra.hideLoader()
      console.log("errrrr----", err);
    })
  }

  wintickets() {
    this.extra.loadershow();
    this.rest.getRequest('customerwinningticket', localStorage.getItem('auth_token')).subscribe((res: any) => {
      console.log('ticket response----', res);
      if (res.status == "success") {
        this.winticketstatus = res.status
        this.extra.hideLoader()

      }
      if (res.status == "error") {
        this.extra.hideLoader()
        this.extra.presentToast(res.message)
      }
    }, (err) => {
      this.extra.hideLoader()
      console.log("errrrr----", err);
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
