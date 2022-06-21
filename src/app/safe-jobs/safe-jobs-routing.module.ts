import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SafeJobsPage } from './safe-jobs.page';

const routes: Routes = [
  {
    path: '',
    component: SafeJobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SafeJobsPageRoutingModule {}
