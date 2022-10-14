import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { Ng2TelInputModule } from 'ng2-tel-input';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { VideoEditor } from '@awesome-cordova-plugins/video-editor/ngx';
import { FlutterwaveModule } from "flutterwave-angular-v3"

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule,
    FlutterwaveModule
  ],
  providers: [Geolocation,
    AndroidPermissions,
    LocationAccuracy,
    NativeGeocoder,
    Chooser,
    Camera,
    VideoEditor,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
