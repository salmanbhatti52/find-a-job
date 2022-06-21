import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CvServicesPageRoutingModule } from './cv-services-routing.module';

import { CvServicesPage } from './cv-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CvServicesPageRoutingModule
  ],
  declarations: [CvServicesPage]
})
export class CvServicesPageModule {}
