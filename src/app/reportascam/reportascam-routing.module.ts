import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportascamPage } from './reportascam.page';

const routes: Routes = [
  {
    path: '',
    component: ReportascamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportascamPageRoutingModule {}
