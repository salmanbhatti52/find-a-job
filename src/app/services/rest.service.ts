import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  baseURL = "https://findajob.ng/api";

  companyid: any;
  constructor(public http: HttpClient,
    private androidPermissions: AndroidPermissions) { }

  sendRequest(action, data?, token?) {

    let header;
    if (token) {
      header = new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
        "Accept": "application/json"
      });
      header.append("Access-Control-Allow-Origin", "*");
      header.append(
        "Access-Control-Allow-Methods",
        "POST, GET, DELETE, PUT,OPTIONS"
      );
    } else {
      console.log('while you signin or signup')
      header = new HttpHeaders({
        "X-CSRF-TOKEN": "SjgrnxUMiNkuKWFN1XKq6JjlaatKlliHbiwey5MM",
        // "Content-Type": "application/json",
        "Accept": "application/json"
      });
      header.append("Access-Control-Allow-Origin", "*");
      header.append(
        "Access-Control-Allow-Methods",
        "POST, GET, DELETE, PUT,OPTIONS"
      );
    }
    let dataToPost = data;
    let url = `${this.baseURL}/${action}`;
    return this.http.post(url, dataToPost, {
      headers: header,
    });
  }


  getRequest(action, token?, param?) {

    let header;

    if (token) {
      header = new HttpHeaders({
        "Authorization": "Bearer " + token,
      });
      header.append("Access-Control-Allow-Origin", "*");
      header.append(
        "Access-Control-Allow-Methods",
        "POST, GET, DELETE, PUT,OPTIONS"
      );
    } else {

      header = new HttpHeaders();
      header.append("Access-Control-Allow-Origin", "*");
      header.append(
        "Access-Control-Allow-Methods",
        "POST, GET, DELETE, PUT,OPTIONS"
      );
    }
    let url;
    if (param) {
      url = `${this.baseURL}/${action}/${param}`;
    } else {
      url = `${this.baseURL}/${action}`;
    }

    return this.http.get(url, {
      headers: header,
    });
  }

  userdetail(action, param, token) {
    let header;
    header = new HttpHeaders({
      "Authorization": "Bearer " + token,
    });
    header.append("Access-Control-Allow-Origin", "*");
    header.append(
      "Access-Control-Allow-Methods",
      "POST, GET, DELETE, PUT,OPTIONS"
    );
    let url = `${this.baseURL}/${action}/${param}`;
    return this.http.get(url, {
      headers: header,
    });
  }

  delete(action, param, token) {
    let header;
    header = new HttpHeaders({
      "Authorization": "Bearer " + token,
    });
    header.append("Access-Control-Allow-Origin", "*");
    header.append(
      "Access-Control-Allow-Methods",
      "POST, GET, DELETE, PUT,OPTIONS"
    );
    let url = `${this.baseURL}/${action}/${param}`;
    return this.http.delete(url, {
      headers: header,
    });
  }




  requestNecessaryPermissions() {

    // Change this array to conform with the permissions you need
    let androidPermissionsList = [
      this.androidPermissions.PERMISSION.CAMERA,
      this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
      this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    ];

    return this.androidPermissions.requestPermissions(androidPermissionsList);
  }


}
