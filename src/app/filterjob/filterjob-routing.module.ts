import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterjobPage } from './filterjob.page';

const routes: Routes = [
  {
    path: '',
    component: FilterjobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterjobPageRoutingModule {}
