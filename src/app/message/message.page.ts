import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';
@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  constructor(public location: Location,
    public navCtrl: NavController,
    public rest: RestService,
    public extra: ExtrasService) { }

  ngOnInit() {

  }

  goback() {
    // this.location.back();
    this.navCtrl.navigateRoot('messages')
  }


}
