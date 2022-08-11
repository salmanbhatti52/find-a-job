import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  userId: any;
  chat: any;

  constructor(public navCtrl: NavController,
    public rest: RestService,
    public extra: ExtrasService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userid');
    this.getchats(this.userId)
  }

  seemessges() {
    this.navCtrl.navigateRoot('message');
  }
  getchats(userid) {
    this.rest.userdetail('get-userchat', userid, localStorage.getItem('auth_token')).subscribe((data: any) => {
      console.log('chats response====', data);
      this.chat = data.chat
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
