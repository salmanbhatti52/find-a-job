import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { HttpClient } from "@angular/common/http";
import { Country } from '../profile/interface';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { RestService } from '../services/rest.service';
import { ExtrasService } from '../services/extras.service';
import axios from 'axios';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  dialcode = '+234';

  allItems: Array<Country> = [];
  private items: Array<Country> = [];

  flaglist = false;

  latitude: any;
  longitude: any;

  users = {
    firstname: '',
    lastname: '',
    email: '',
    phoneno: '',
    nationality: '',
    password: '',
    confirmpassword: ''
  }

  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    private http: HttpClient,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    public rest: RestService,
    public extra: ExtrasService) { }

  ngOnInit() {
    this.checkGPSPermission();
  }
  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menuCtrl.enable(true);
  }
  gotosigin() {
    this.navCtrl.navigateForward('signin');
  }

  openlist() {
    this.setItems();
    this.flaglist = true;
  }
  setItems() {
    this.http.get('assets/countries.json').toPromise().then(
      (res: any) => {
        this.allItems = res.countries;
        this.items = this.allItems;
        console.log('items', this.items);

      }
    );
  }
  viewDetails(item) {
    // console.log('code===', item)
    this.flaglist = false
    this.dialcode = '+' + item.callingCodes
  }

  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {

          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocationCoordinates()
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }

  // Methos to get device accurate coordinates using device GPS
  getLocationCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('locationCoords==', resp.coords.latitude + '/n' + resp.coords.longitude)
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.getnaivecoordinates(resp.coords.latitude, resp.coords.longitude)
    }).catch((error) => {
      alert('Error getting location' + error);
    });
  }

  getnaivecoordinates(lat, lng) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lat, lng, options).then((result: NativeGeocoderResult[]) => {
      console.log('native codes===', JSON.stringify(result[0]));
      this.users.nationality = result[0].countryName
    }).catch((error: any) => console.log(error));

  }

  signup() {

    if (this.users.phoneno == '') {
      this.extra.presentToast('The phone field is required.');
    } else {
      this.extra.loadershow();
      let data = {
        firstname: this.users.firstname,
        lastname: this.users.lastname,
        email: this.users.email,
        phone: this.dialcode + this.users.phoneno,
        nationality: this.users.nationality,
        plan: 1,
        password: this.users.password,
        password_confirmation: this.users.confirmpassword
      }
      axios.post('https://findajob.ng/api/register', data).then(response => {
        console.log('User signed in!', response);
        this.extra.hideLoader();
        // localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('userid', response.data.user.id);
        this.navCtrl.navigateRoot('signin');
      }).catch(error => {
        console.log('error response', error);
        if (error.response.data.errors) {
          this.extra.hideLoader();
          if (error.response.data.errors.firstname) {
            this.extra.presentToast(error.response.data.errors.firstname[0]);
          }
          else if (error.response.data.errors.lastname) {
            this.extra.presentToast(error.response.data.errors.lastname[0]);
          } else if (error.response.data.errors.email) {
            this.extra.presentToast(error.response.data.errors.email[0]);
          } else if (error.response.data.errors.nationality) {
            this.extra.presentToast(error.response.data.errors.nationality[0]);
          }
          else if (error.response.data.errors.password) {
            this.extra.presentToast(error.response.data.errors.password[0]);
          }
        }

        else {
          this.extra.hideLoader();
          this.extra.presentToast(error.response.data.message);
        }

      });
      // this.rest.sendRequest("register", data).subscribe(async (data: any) => {
      //   this.extra.hideLoader();
      //   console.log("data----", data);
      //   // localStorage.setItem('auth_token', data.token)
      //   localStorage.setItem('userid', data.user.id)

      //   this.navCtrl.navigateRoot('signin');
      // }, (err) => {
      //   this.extra.hideLoader();
      //   console.log('error==', err);
      //   if (err.error.errors) {
      //     if (err.error.errors.firstname) {
      //       this.extra.presentToast(err.error.errors.firstname[0]);
      //     }
      //     else if (err.error.errors.lastname) {
      //       this.extra.presentToast(err.error.errors.lastname[0]);
      //     } else if (err.error.errors.email) {
      //       this.extra.presentToast(err.error.errors.email[0]);
      //     } else if (err.error.errors.nationality) {
      //       this.extra.presentToast(err.error.errors.nationality[0]);
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


  }


}
