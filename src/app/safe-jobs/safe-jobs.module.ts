import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SafeJobsPageRoutingModule } from './safe-jobs-routing.module';

import { SafeJobsPage } from './safe-jobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SafeJobsPageRoutingModule
  ],
  declarations: [SafeJobsPage]
})
export class SafeJobsPageModule {}
