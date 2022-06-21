import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindajobPage } from './findajob.page';

const routes: Routes = [
  {
    path: '',
    component: FindajobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindajobPageRoutingModule {}
