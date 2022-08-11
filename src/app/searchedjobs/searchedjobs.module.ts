import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchedjobsPageRoutingModule } from './searchedjobs-routing.module';

import { SearchedjobsPage } from './searchedjobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchedjobsPageRoutingModule
  ],
  declarations: [SearchedjobsPage]
})
export class SearchedjobsPageModule {}
