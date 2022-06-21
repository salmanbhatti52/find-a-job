import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobappointmentPageRoutingModule } from './jobappointment-routing.module';

import { JobappointmentPage } from './jobappointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobappointmentPageRoutingModule
  ],
  declarations: [JobappointmentPage]
})
export class JobappointmentPageModule {}
