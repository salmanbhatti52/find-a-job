import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedjobsPage } from './savedjobs.page';

const routes: Routes = [
  {
    path: '',
    component: SavedjobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedjobsPageRoutingModule {}
