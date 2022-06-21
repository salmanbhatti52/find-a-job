import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CvServicesPage } from './cv-services.page';

const routes: Routes = [
  {
    path: '',
    component: CvServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CvServicesPageRoutingModule {}
