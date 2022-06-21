import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobappointmentPage } from './jobappointment.page';

const routes: Routes = [
  {
    path: '',
    component: JobappointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobappointmentPageRoutingModule {}
