import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
@Component({
  selector: 'app-cv-services',
  templateUrl: './cv-services.page.html',
  styleUrls: ['./cv-services.page.scss'],
})
export class CvServicesPage implements OnInit {
  str = 'Do It Yourself With A Wizard, Review CV';
  cvservices = []
  constructor(public navCtrl: NavController,
    public rest: RestService) { }

  ngOnInit() {
    let split = this.str.split(',');

    console.log('split', split);
    this.CvServices();

  }

  CvServices() {
    this.rest.getRequest('cvservices', localStorage.getItem('auth_token')).subscribe((res: any) => {

      console.log('response-===--', res);
      res.cvservices.forEach(item => {
        let data = {
          id: item.id,
          name: item.name,
          price: item.price,
          services: item.services.split(',')
        }
        this.cvservices.push(data)

      });
      console.log('services====', this.cvservices)
    })
  }

  open(index) {
    this.cvservices[index].isdown = !(this.cvservices[index].isdown);
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
