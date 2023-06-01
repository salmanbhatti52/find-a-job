import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlljobsalertPage } from './alljobsalert.page';

const routes: Routes = [
  {
    path: '',
    component: AlljobsalertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlljobsalertPageRoutingModule {}
