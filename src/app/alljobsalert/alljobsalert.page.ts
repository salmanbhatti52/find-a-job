import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-alljobsalert',
  templateUrl: './alljobsalert.page.html',
  styleUrls: ['./alljobsalert.page.scss'],
})
export class AlljobsalertPage implements OnInit {
  jobsalert: any;

  constructor(public rest: RestService,
    public extra: ExtrasService,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.getjobsalert()
  }

  getjobsalert() {
    this.rest.getRequest('get-job-alert-roles', localStorage.getItem('auth_token')).subscribe((data: any) => {
      console.log('get-job-alert-roles====', data);
      this.jobsalert = data.jobalerts


    })
  }

  create() {
    this.navCtrl.navigateForward('jobalert')
  }

}
