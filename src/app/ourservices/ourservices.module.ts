import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OurservicesPageRoutingModule } from './ourservices-routing.module';

import { OurservicesPage } from './ourservices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OurservicesPageRoutingModule
  ],
  declarations: [OurservicesPage]
})
export class OurservicesPageModule {}
