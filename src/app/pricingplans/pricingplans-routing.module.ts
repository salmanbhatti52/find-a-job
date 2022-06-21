import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PricingplansPage } from './pricingplans.page';

const routes: Routes = [
  {
    path: '',
    component: PricingplansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PricingplansPageRoutingModule {}
