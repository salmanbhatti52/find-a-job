import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PricingplansPageRoutingModule } from './pricingplans-routing.module';

import { PricingplansPage } from './pricingplans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PricingplansPageRoutingModule
  ],
  declarations: [PricingplansPage]
})
export class PricingplansPageModule {}
