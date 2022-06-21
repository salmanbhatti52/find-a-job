import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobcentersPage } from './jobcenters.page';

const routes: Routes = [
  {
    path: '',
    component: JobcentersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobcentersPageRoutingModule {}
