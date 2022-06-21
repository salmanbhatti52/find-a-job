import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobcentersPageRoutingModule } from './jobcenters-routing.module';

import { JobcentersPage } from './jobcenters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobcentersPageRoutingModule
  ],
  declarations: [JobcentersPage]
})
export class JobcentersPageModule {}
