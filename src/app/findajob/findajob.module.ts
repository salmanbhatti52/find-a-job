import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindajobPageRoutingModule } from './findajob-routing.module';

import { FindajobPage } from './findajob.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindajobPageRoutingModule
  ],
  declarations: [FindajobPage]
})
export class FindajobPageModule {}
