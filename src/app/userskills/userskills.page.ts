import { Component, OnInit } from '@angular/core';
import { ExtrasService } from '../services/extras.service';
import { RestService } from '../services/rest.service';

import { Location } from '@angular/common';
@Component({
  selector: 'app-userskills',
  templateUrl: './userskills.page.html',
  styleUrls: ['./userskills.page.scss'],
})
export class UserskillsPage implements OnInit {
  skill = '';
  proficiency = '';
  constructor(public rest: RestService,
    public extra: ExtrasService,
    public location: Location) { }

  ngOnInit() {
  }

  goback() {
    this.location.back()
  }

  add() {
    if (this.skill == '') {
      this.extra.presentToast('Add atleast one skill')
    } else if (this.proficiency == '') {
      this.extra.presentToast('Proficiency field required');
    } else {
      let datatosend = {
        skill: this.skill,
        proficiency: this.proficiency
      }
      this.rest.sendRequest('add-skills', datatosend, localStorage.getItem('auth_token')).subscribe((res: any) => {
        console.log('add-skills rsponse==', res);
        if (res.status == 'true') {
          this.skill = '';
          this.proficiency = '';
          this.extra.presentToast(res.message)
        }
        if (res.status == 'false') {
          this.extra.presentToast(res.message)
        }
      })
    }
  }
}
