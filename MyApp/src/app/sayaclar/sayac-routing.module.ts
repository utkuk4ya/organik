import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SayacPage } from './sayac.page'; // kendi sayfa component'inin yolu

const routes: Routes = [
  {
    path: '',
    component: SayacPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SayacPageRoutingModule {}