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
  constructor(public rest: RestService) { }

  ngOnInit() {
    this.getplans();
    console.log('auth token==', localStorage.getItem('auth_token'))
  }

  getplans() {
    this.rest.getRequest("plans", localStorage.getItem('auth_token')).subscribe(async (data: any) => {

      console.log("data----", data);
      this.plans = data.plans
      console.log('plans--', this.plans)
    }, (err) => {
      console.log("errrrr----", err);
    })
  }

}
