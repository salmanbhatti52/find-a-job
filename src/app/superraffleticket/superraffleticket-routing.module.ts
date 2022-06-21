import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperraffleticketPage } from './superraffleticket.page';

const routes: Routes = [
  {
    path: '',
    component: SuperraffleticketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperraffleticketPageRoutingModule {}
