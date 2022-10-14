import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Flutterwave, InlinePaymentOptions, PaymentSuccessResponse } from "flutterwave-angular-v3"
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  publicKey = "FLWPUBK_TEST-9ac1328d7974f49557d245ff89c760bf-X";

  customerDetails: any;

  customizations = { title: 'Customization Title', description: 'Customization Description', logo: 'https://flutterwave.com/images/logo-colored.svg' }

  meta = { 'counsumer_id': '7898', 'consumer_mac': 'kjs9s8ss7dd' }
  paymentData: any;
  name: any;
  price: any;
  services: any;
  userId: any;
  fullname: any;
  email: any;
  phone: any;
  constructor(public navCtrl: NavController,
    private flutterwave: Flutterwave,
    public rest: RestService,
    public location: Location,
    public extra: ExtrasService) { }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('details'));
    console.log('details cmoing====', data);
    this.name = data.name;
    this.price = data.price
    this.services = data.services;

    this.userId = localStorage.getItem('userid');
    this.userdetails(this.userId)

  }

  goback() {
    this.location.back();
  }

  userdetails(userid) {
    this.rest.userdetail('getuser', userid, localStorage.getItem('auth_token')).subscribe((data: any) => {

      console.log('getuser data==', data);
      this.customerDetails = {
        name: data.user.full_name,
        email: data.user.email,
        phone_number: data.user.phone
      }
      this.paymentdetails(this.customerDetails)
    })
  }
  paymentdetails(customerDetails) {
    this.paymentData = {
      public_key: this.publicKey,
      tx_ref: this.generateReference(),
      amount: this.price,
      currency: 'NGN',
      payment_options: 'card,ussd',
      redirect_url: '',
      meta: this.meta,
      customer: customerDetails,
      customizations: this.customizations,
      callback: this.makePaymentCallback,
      onclose: this.closedPaymentModal,
      callbackContext: this
    }
  }
  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Pay", response);
    this.Topay(response)

  }
  closedPaymentModal(): void {
    console.log('payment is closed');
  }
  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }

  Topay(response) {
    let data = {
      transaction_ref: response.tx_ref,
      subscription_id: response.transaction_id,
      subscription_type: 'CV Service',
      response: response.status
    }
    this.rest.sendRequest('payment', data, localStorage.getItem('auth_token')).subscribe((res: any) => {
      console.log('payment response====', res);
      if (res.status == 'true') {
        this.extra.presentToast(res.message);
        this.flutterwave.closePaymentModal()
      } else {
        this.extra.presentToast(res.message);
      }

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

}
