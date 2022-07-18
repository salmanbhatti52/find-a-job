import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmploymenthistoryPage } from './employmenthistory.page';

const routes: Routes = [
  {
    path: '',
    component: EmploymenthistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmploymenthistoryPageRoutingModule {}
