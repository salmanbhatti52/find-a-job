import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmploymenthistoryPageRoutingModule } from './employmenthistory-routing.module';

import { EmploymenthistoryPage } from './employmenthistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmploymenthistoryPageRoutingModule
  ],
  declarations: [EmploymenthistoryPage]
})
export class EmploymenthistoryPageModule {}
