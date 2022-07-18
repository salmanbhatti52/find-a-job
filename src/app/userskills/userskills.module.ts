import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserskillsPageRoutingModule } from './userskills-routing.module';

import { UserskillsPage } from './userskills.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserskillsPageRoutingModule
  ],
  declarations: [UserskillsPage]
})
export class UserskillsPageModule {}
