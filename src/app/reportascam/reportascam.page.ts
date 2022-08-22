import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';
import { isThursday } from 'date-fns';

@Component({
  selector: 'app-reportascam',
  templateUrl: './reportascam.page.html',
  styleUrls: ['./reportascam.page.scss'],
})
export class ReportascamPage implements OnInit {
  droplist = false
  list = [
    { name: 'Fake job advert', status: 'unchecked' }, { name: 'Pay for job scam', status: 'unchecked' }, { name: 'Unacceptable behaviour', status: 'unchecked' }, { name: 'Other', status: 'unchecked' }
  ];
  complainlist = [{ name: 'Established Facts', status: 'unchecked' }]
  behaviour_type = '';
  complain_type = '';
  showcomplain = false;
  firstname = '';
  lastname = '';
  phonenumber = '';
  email = '';
  userId = '';
  details: any;
  constructor(public navCtrl: NavController,
    public rest: RestService,
    public extra: ExtrasService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userid');
    this.getuserdetails(this.userId)
  }

  getuserdetails(userid) {
    this.extra.loadershow();
    this.rest.userdetail('getuser', userid, localStorage.getItem('auth_token')).subscribe((data: any) => {

      console.log('getuser data==', data);
      this.extra.hideLoader();
      this.firstname = data.user.firstname;
      this.lastname = data.user.lastname
      this.email = data.user.email;
      this.phonenumber = data.user.phone;
    })
  }

  openlist() {
    if (this.droplist == false) {
      this.droplist = true
    } else {
      this.droplist = false
    }
  }
  select(index, type) {
    this.list.map((val, i) => {
      if (index == i) {
        this.list[i].status = 'checked';
        this.behaviour_type = type.name;
        console.log('dsadsd', this.behaviour_type);
        this.droplist = false
      }
      if (index != i) {
        this.list[i].status = 'unchecked';
      }
    })


  }

  opencomplain() {
    if (this.showcomplain == false) {
      this.showcomplain = true
    } else {
      this.showcomplain = false
    }
  }
  selectcomplain(index, type) {
    this.list.map((val, i) => {
      if (index == i) {
        this.list[i].status = 'checked';
        this.complain_type = type.name;
        this.showcomplain = false
      }
      if (index != i) {
        this.list[i].status = 'unchecked';
      }
    })
  }

  reportscam() {
    if (this.behaviour_type == '') {
      this.extra.presentToast('Select Behaviour Type')
    }
    else if (this.complain_type == '') {
      this.extra.presentToast('Select Complain Type')
    }
    else if (this.firstname == '') {
      this.extra.presentToast('First Name Required')
    }
    else if (this.phonenumber == '') {
      this.extra.presentToast('Phone Number Required')
    }
    else if (this.email == '') {
      this.extra.presentToast('Email Required')
    }
    else {
      this.extra.loadershow()
      let data = {
        behaviour_type: this.behaviour_type,
        corruption_type: this.complain_type,
        first_name: this.firstname,
        last_name: this.lastname,
        phone: this.phonenumber,
        registered_email: this.email
      }
      this.rest.sendRequest('reportscam', data, localStorage.getItem('auth_token')).subscribe((res: any) => {
        console.log('scam response----', res);
        this.extra.hideLoader();
        this.extra.presentToast(res.message)
      }, err => {
        this.extra.hideLoader();
        console.log('err', err);

      })
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
