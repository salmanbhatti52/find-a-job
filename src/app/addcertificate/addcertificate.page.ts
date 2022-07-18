import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';
import { ExtrasService } from '../services/extras.service';
import { RestService } from '../services/rest.service';
@Component({
  selector: 'app-addcertificate',
  templateUrl: './addcertificate.page.html',
  styleUrls: ['./addcertificate.page.scss'],
})
export class AddcertificatePage implements OnInit {
  certificate = '';
  startPicker = false;
  endPicker = false;
  dateValue = format(new Date(), 'yyyy-MM-dd');
  starteddate = '';
  endeddate = '';
  constructor(public location: Location,
    public extra: ExtrasService,
    public rest: RestService) { }

  ngOnInit() {
  }

  goback() {
    this.location.back();
  }
  startdate(value) {
    this.dateValue = value;
    this.starteddate = format(parseISO(value), ' yyyy-MM-d');
    this.startPicker = false;
  }

  enddate(value) {
    this.dateValue = value;
    this.endeddate = format(parseISO(value), ' yyyy-MM-d');
    this.endPicker = false;
  }


  add() {
    if (this.certificate == '') {
      this.extra.presentToast('Certifcate field required')
    } else if (this.starteddate == '') {
      this.extra.presentToast('Choose start date')
    }
    else if (this.endeddate == '') {
      this.extra.presentToast('Choose end date')
    } else {
      let datatosend = {
        certificate: this.certificate,
        start_date: this.starteddate,
        end_date: this.endeddate
      }
      this.rest.sendRequest('add-certificate', datatosend, localStorage.getItem('auth_token')).subscribe((res: any) => {
        console.log('add-certificate rsponse==', res);
        if (res.status == 'true') {
          this.certificate = '';
          this.starteddate = '';
          this.endeddate = '';
          this.extra.presentToast(res.message)
        }
        if (res.status == 'false') {
          this.extra.presentToast(res.message)
        }
      })
    }
  }

}
