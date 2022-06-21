import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';
import axios from 'axios';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  email: any = '';
  password: any = '';

  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public rest: RestService,
    public extra: ExtrasService) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menuCtrl.enable(true);
  }

  login() {
    let data = {
      email: this.email,
      password: this.password
    }

    // axios.get('https://findajob.ng/api/sanctum/SjgrnxUMiNkuKWFN1XKq6JjlaatKlliHbiwey5MM').then(response => {
    // console.log('response get=', response)
    axios.post('https://findajob.ng/api/login', data).then(response => {
      console.log('User signed in!', response);
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('userid', response.data.user.id);
      this.navCtrl.navigateRoot('dashboard');
    }, err => {
      console.log('error response', err);
      if (err.response.data.errors) {
        if (err.response.data.errors.email) {
          this.extra.presentToast(err.response.data.errors.email[0]);
        }
        else if (err.response.data.errors.password) {
          this.extra.presentToast(err.response.data.errors.password[0]);
        }
      }

      else {
        this.extra.presentToast(err.response.data.message);
      }
    }) // credentials didn't match
    // });
    // this.rest.sendRequest("login", data).subscribe(async (data: any) => {

    //   console.log("data----", data);
    //   localStorage.setItem('auth_token', data.token)
    //   localStorage.setItem('userid', data.user.id)

    //   this.navCtrl.navigateRoot('dashboard');
    // }, (err) => {
    //   console.log('err==', err);
    //   if (err.error.errors) {
    //     if (err.error.errors.email) {
    //       this.extra.presentToast(err.error.errors.email[0]);
    //     }
    //     else if (err.error.errors.password) {
    //       this.extra.presentToast(err.error.errors.password[0]);
    //     }
    //   }

    //   else {
    //     this.extra.presentToast(err.error.message)
    //   }
    // })

  }
  gotosignup() {
    this.navCtrl.navigateForward('signup');
  }
  forgot() {
    this.navCtrl.navigateForward('forgotpassword');
  }

}
