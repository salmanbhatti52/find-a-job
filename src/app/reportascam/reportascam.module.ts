import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportascamPageRoutingModule } from './reportascam-routing.module';

import { ReportascamPage } from './reportascam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportascamPageRoutingModule
  ],
  declarations: [ReportascamPage]
})
export class ReportascamPageModule {}
