import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuperraffleticketPageRoutingModule } from './superraffleticket-routing.module';

import { SuperraffleticketPage } from './superraffleticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperraffleticketPageRoutingModule
  ],
  declarations: [SuperraffleticketPage]
})
export class SuperraffleticketPageModule {}
