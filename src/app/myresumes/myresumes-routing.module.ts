import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyresumesPage } from './myresumes.page';

const routes: Routes = [
  {
    path: '',
    component: MyresumesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyresumesPageRoutingModule {}
