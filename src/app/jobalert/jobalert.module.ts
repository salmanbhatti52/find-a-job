import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobalertPageRoutingModule } from './jobalert-routing.module';

import { JobalertPage } from './jobalert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobalertPageRoutingModule
  ],
  declarations: [JobalertPage]
})
export class JobalertPageModule {}
