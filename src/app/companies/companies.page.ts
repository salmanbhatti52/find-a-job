import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ExtrasService } from '../services/extras.service';
import { RestService } from '../services/rest.service';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.page.html',
  styleUrls: ['./companies.page.scss'],
})
export class CompaniesPage implements OnInit {
  companies: any;

  constructor(public navCtrl: NavController,
    public rest: RestService,
    public extra: ExtrasService) { }

  ngOnInit() {
    this.getcompanies();
  }

  getcompanies() {
    this.extra.loadershow();
    this.rest.getRequest('employers', localStorage.getItem('auth_token')).subscribe((data: any) => {
      console.log('interviews=====', data);
      this.companies = data.employers
      this.extra.hideLoader();
    })
  }
  seedetail(item) {
    this.rest.companyid = item.id
    this.navCtrl.navigateForward('company-details');
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
