import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobSeekerVideosPageRoutingModule } from './job-seeker-videos-routing.module';

import { JobSeekerVideosPage } from './job-seeker-videos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobSeekerVideosPageRoutingModule
  ],
  declarations: [JobSeekerVideosPage]
})
export class JobSeekerVideosPageModule {}
