import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedjobsPageRoutingModule } from './savedjobs-routing.module';

import { SavedjobsPage } from './savedjobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedjobsPageRoutingModule
  ],
  declarations: [SavedjobsPage]
})
export class SavedjobsPageModule {}
