import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuPage } from './su.page';

const routes: Routes = [
  {
    path: '',
    component: SuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuPageRoutingModule {}
