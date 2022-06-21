import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OurservicesPage } from './ourservices.page';

const routes: Routes = [
  {
    path: '',
    component: OurservicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OurservicesPageRoutingModule {}
