import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AbonelerPage } from './aboneler.page';

const routes: Routes = [
  {
    path: '',
    component: AbonelerPage
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbonelerPageRoutingModule {}
