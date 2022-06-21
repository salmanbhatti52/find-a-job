import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaffleticketsPage } from './raffletickets.page';

const routes: Routes = [
  {
    path: '',
    component: RaffleticketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RaffleticketsPageRoutingModule {}
