import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobcenterdetailsPage } from './jobcenterdetails.page';

const routes: Routes = [
  {
    path: '',
    component: JobcenterdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobcenterdetailsPageRoutingModule {}
