import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterjobPageRoutingModule } from './filterjob-routing.module';

import { FilterjobPage } from './filterjob.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterjobPageRoutingModule
  ],
  declarations: [FilterjobPage]
})
export class FilterjobPageModule {}
