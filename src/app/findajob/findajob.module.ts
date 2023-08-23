import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindajobPageRoutingModule } from './findajob-routing.module';

import { FindajobPage } from './findajob.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindajobPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [FindajobPage]
})
export class FindajobPageModule { }
