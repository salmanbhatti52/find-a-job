import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobalertPage } from './jobalert.page';

const routes: Routes = [
  {
    path: '',
    component: JobalertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobalertPageRoutingModule {}
