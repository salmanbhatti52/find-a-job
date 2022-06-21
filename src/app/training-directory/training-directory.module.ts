import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingDirectoryPageRoutingModule } from './training-directory-routing.module';

import { TrainingDirectoryPage } from './training-directory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingDirectoryPageRoutingModule
  ],
  declarations: [TrainingDirectoryPage]
})
export class TrainingDirectoryPageModule {}
