import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobcentersPageRoutingModule } from './jobcenters-routing.module';

import { JobcentersPage } from './jobcenters.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobcentersPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [JobcentersPage]
})
export class JobcentersPageModule { }
