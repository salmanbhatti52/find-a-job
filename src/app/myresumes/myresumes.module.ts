import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyresumesPageRoutingModule } from './myresumes-routing.module';

import { MyresumesPage } from './myresumes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyresumesPageRoutingModule
  ],
  declarations: [MyresumesPage]
})
export class MyresumesPageModule {}
