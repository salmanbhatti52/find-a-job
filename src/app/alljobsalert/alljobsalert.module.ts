import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlljobsalertPageRoutingModule } from './alljobsalert-routing.module';

import { AlljobsalertPage } from './alljobsalert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlljobsalertPageRoutingModule
  ],
  declarations: [AlljobsalertPage]
})
export class AlljobsalertPageModule {}
