import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FilterjobPage } from '../filterjob/filterjob.page';
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';
@Component({
  selector: 'app-findajob',
  templateUrl: './findajob.page.html',
  styleUrls: ['./findajob.page.scss'],
})
export class FindajobPage implements OnInit {
  jobs = [];
  constructor(public navCtrl: NavController,
    public modalController: ModalController,
    public rest: RestService,
    public extra: ExtrasService) { }

  ngOnInit() {
    this.getjobs();
  }



  getjobs() {
    // this.extra.loadershow();
    this.rest.getRequest('jobs', localStorage.getItem('auth_token')).subscribe((data: any) => {
      // this.extra.hideLoader();
      console.log('jobs data==', data);
      this.jobs = data.jobs

    }, err => {
      // this.extra.hideLoader();
      console.log('error:::', err)
    })
  }
  seedetail(jobid) {
    localStorage.setItem('jobid', jobid)
    this.navCtrl.navigateForward('job-detail');
  }

  // filterjobs() {
  //   this.navCtrl.navigateForward('filterjob');
  // }
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
