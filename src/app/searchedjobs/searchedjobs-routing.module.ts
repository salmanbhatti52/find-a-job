import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchedjobsPage } from './searchedjobs.page';

const routes: Routes = [
  {
    path: '',
    component: SearchedjobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchedjobsPageRoutingModule {}
