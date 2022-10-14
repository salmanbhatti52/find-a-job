import { ExtrasService } from './../services/extras.service';
import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
@Component({
  selector: 'app-pricingplans',
  templateUrl: './pricingplans.page.html',
  styleUrls: ['./pricingplans.page.scss'],
})
export class PricingplansPage implements OnInit {
  slideOpts = {
    spaceBetween: 15,
    slidesPerView: 1.2,
    centeredSlides: true,
    initialSlide: 0,
    speed: 400
  };
  plans = [];
  type: any;
  constructor(public rest: RestService,
    public extra: ExtrasService) { }

  ngOnInit() {
    this.getplans();
    console.log('auth token==', localStorage.getItem('auth_token'))
  }

  getplans() {
    this.extra.loadershow();
    this.rest.getRequest("plans", localStorage.getItem('auth_token')).subscribe(async (data: any) => {
      this.extra.hideLoader()
      console.log("data----", data);
      this.plans = data.plans

    }, (err) => {
      this.extra.hideLoader()
      console.log("errrrr----", err);
    })
  }

  startplan(p) {

    // console.log('plans detail====', p);
    if (p.name == "Basic Plan") {
      this.type = 'registration';
      this.callapi(this.type)
    }
    if (p.name == "JOB SEEKER PRO") {
      this.type = 'id_verification'
      this.callapi(this.type)
    }
    if (p.name == "JOB SEEKER PROFILE VERIFICATION BOOSTER") {
      this.type = 'boster_service'
      this.callapi(this.type)
    }
    if (p.name == "JOB SEEKER PROFILE BOOSTER") {
      this.type = 'premium_subscription'
      this.callapi(this.type)
    }
  }

  callapi(type) {
    this.extra.loadershow();
    this.rest.getRequest('raffleticket', localStorage.getItem('auth_token'), type).subscribe((res: any) => {
      console.log('ticket response----', res);
      if (res.status == "success") {
        this.extra.hideLoader()
        this.extra.presentToast(res.message)
      }
      if (res.status == "error") {
        this.extra.hideLoader()
        this.extra.presentToast(res.message)
      }
    }, (err) => {
      this.extra.hideLoader()
      console.log("errrrr----", err);
    })
  }

}
