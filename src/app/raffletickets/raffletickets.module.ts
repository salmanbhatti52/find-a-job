import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RaffleticketsPageRoutingModule } from './raffletickets-routing.module';

import { RaffleticketsPage } from './raffletickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RaffleticketsPageRoutingModule
  ],
  declarations: [RaffleticketsPage]
})
export class RaffleticketsPageModule {}
