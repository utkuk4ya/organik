import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GazPage } from './gaz.page';

const routes: Routes = [
  {
    path: '',
    component: GazPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GazPageRoutingModule {}
