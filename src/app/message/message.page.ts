import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  constructor(public location: Location,
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  goback() {
    // this.location.back();
    this.navCtrl.navigateRoot('messages')
  }

}
