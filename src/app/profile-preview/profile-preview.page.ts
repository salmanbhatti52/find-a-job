import { NavController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PopupPage } from '../popup/popup.page';
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';
@Component({
  selector: 'app-profile-preview',
  templateUrl: './profile-preview.page.html',
  styleUrls: ['./profile-preview.page.scss'],
})
export class ProfilePreviewPage implements OnInit {
  userId: any;
  fullname: any;
  email: any;
  phone: any;
  nationality: any;
  userimg: any;
  userprofile: any;
  identification_no: any;
  gender: any;
  state: any;
  age: any;
  salary: any;
  jobstatus: any;
  religion: any;
  tribe: any;
  height: any;
  complexion: any;
  disability: any;
  disabilitytype: any;

  skills: any;
  educationdetails: any;

  dropdown = false;
  employhistorydetails: any;
  certificates: any;
  seekerstatus: any;
  constructor(public location: Location,
    public navCtrl: NavController,
    public modal: ModalController,
    public rest: RestService,
    public extra: ExtrasService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userid');
    this.getuserdetails(this.userId);

  }

  goback() {
    this.location.back();
  }
  editprofile() {
    this.navCtrl.navigateRoot('profile');

  }
  getuserdetails(userid) {
    this.extra.loadershow();
    this.rest.userdetail('getuser', userid, localStorage.getItem('auth_token')).subscribe((data: any) => {

      console.log('getuser data==', data);
      this.identification_no = data.user.identification_no;
      this.gender = data.user.gender
      this.fullname = data.user.full_name;
      this.email = data.user.email;
      this.phone = data.user.phone;
      this.nationality = data.user.nationality;
      this.userprofile = data.user.profile_image;
      this.state = data.user.state
      this.seekerstatus = data.user.seeker_status


      //get age///
      const bdate = new Date(data.user.dofb);
      const timeDiff = Math.abs(Date.now() - bdate.getTime());
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      console.log('age diff', this.age);
      ////////////

      this.getskills(this.userId)

    })
  }

  getskills(userid) {
    this.rest.userdetail('get-skills', userid, localStorage.getItem('auth_token')).subscribe((data: any) => {
      console.log('get-skills data==', data);
      this.skills = data.skills;

      this.getusereducation()
    })
  }
  getusereducation() {
    this.rest.userdetail('get-education', this.userId, localStorage.getItem('auth_token')).subscribe((data: any) => {
      console.log('get-education==', data);
      this.educationdetails = data.education;
      this.employhistory()
    })
  }

  employhistory() {
    this.rest.userdetail('get-employment', this.userId, localStorage.getItem('auth_token')).subscribe((data: any) => {
      console.log('get-employment==', data);
      this.employhistorydetails = data.employment;
      this.usercertificate()
    })
  }

  usercertificate() {
    this.rest.userdetail('get-certificate', this.userId, localStorage.getItem('auth_token')).subscribe((data: any) => {
      console.log('get-certificate==', data);
      this.certificates = data.certificate;
      this.extra.hideLoader();
    })
  }

  //open education detail//
  open(index, list) {
    // console.log('index number', index);
    // console.log('list', list);
    this.educationdetails[index].isdown = !(this.educationdetails[index].isdown);

  }
  //open employ history///
  opendetail(i, list) {
    this.employhistorydetails[i].isdown = !(this.employhistorydetails[i].isdown);
  }

  //opencerticatedetail///
  certificatedetail(i) {
    this.certificates[i].isdown = !(this.certificates[i].isdown);
  }
  //////////////////////

  delskill(i, item) {
    // console.log('index number get', item);
    this.rest.delete('delete-skills', item.id, localStorage.getItem('auth_token')).subscribe((data: any) => {
      console.log('delete-skills==', data);
      this.extra.presentToast(data.message)
      let splice = this.skills.splice(i, 1)
      // console.log('splice index', splice);

    })
  }

  deledu(i, list) {
    // console.log('list del', list);
    this.extra.loadershow();
    this.rest.delete('delete-education', list.id, localStorage.getItem('auth_token')).subscribe((data: any) => {
      console.log('delete-education==', data);
      this.extra.presentToast(data.message);
      this.extra.hideLoader();
      let splice = this.educationdetails.splice(i, 1)
      // console.log('splice index', splice);

    })
  }

  //delemployhistory//
  delhistory(i, list) {
    this.rest.delete('delete-employment', list.id, localStorage.getItem('auth_token')).subscribe((data: any) => {
      console.log('delete-employment==', data);
      this.extra.presentToast(data.message)
      let splice = this.employhistorydetails.splice(i, 1)
      // console.log('splice index', splice);

    })
  }

  // delcertificate///
  delcertificate(i, list) {
    this.rest.delete('delete-certificate', list.id, localStorage.getItem('auth_token')).subscribe((data: any) => {
      console.log('delete-certificate==', data);
      this.extra.presentToast(data.message)
      let splice = this.certificates.splice(i, 1)
      // console.log('splice index', splice);

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

  async openpopup() {
    const modal = await this.modal.create({
      component: PopupPage,
      cssClass: 'popupclass',
    });
    modal.onDidDismiss().then((data) => {
      console.log('data', data)
    });
    return await modal.present();
  }
}
