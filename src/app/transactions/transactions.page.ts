import { NavController, Platform } from '@ionic/angular';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RestService } from '../services/rest.service';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  dropdown = false;
  transaction: any;
  footerhide = false;
  constructor(public navCtrl: NavController,
    public rest: RestService,
    public platform: Platform,
    public cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.platform.keyboardDidShow.subscribe(ev => {
      console.log('keyboard show', ev);
      this.footerhide = true;
      this.cd.detectChanges();

    });


    this.platform.keyboardDidHide.subscribe(ev => {
      this.footerhide = false;

      this.cd.detectChanges();
      console.log('keyboard hide');

    });
    this.gettransaction()
  }

  gettransaction() {
    this.rest.getRequest('get-transactions', localStorage.getItem('auth_token')).subscribe((res: any) => {
      this.transaction = res.transactions.length
      console.log('response-===--', this.transaction);

    })
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
