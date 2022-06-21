import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobcenterdetailsPageRoutingModule } from './jobcenterdetails-routing.module';

import { JobcenterdetailsPage } from './jobcenterdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobcenterdetailsPageRoutingModule
  ],
  declarations: [JobcenterdetailsPage]
})
export class JobcenterdetailsPageModule {}
