import { NavController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FilterjobPage } from '../filterjob/filterjob.page';
import { RestService } from '../services/rest.service';
@Component({
  selector: 'app-jobcenters',
  templateUrl: './jobcenters.page.html',
  styleUrls: ['./jobcenters.page.scss'],
})
export class JobcentersPage implements OnInit {
  jobcenters = [];
  constructor(public navCtrl: NavController,
    public modalController: ModalController,
    public rest: RestService) { }

  ngOnInit() {
    this.getjobcenters();
  }


  getjobcenters() {
    this.rest.getRequest('jobcenters', localStorage.getItem('auth_token')).subscribe((data: any) => {
      console.log('data get of job centers===', data);
      this.jobcenters = data.jobcenters
    })
  }
  async filterjobs() {
    const modal = await this.modalController.create({
      component: FilterjobPage,
      cssClass: 'filterclass',
    });
    modal.onDidDismiss().then((data) => {
      console.log('data', data)
    });
    return await modal.present();
  }
  seedetail() {
    this.navCtrl.navigateRoot('jobcenterdetails');
  }
  showmore() {
    this.navCtrl.navigateRoot('dashboard');
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
