import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CariPage } from './cari.page';

const routes: Routes = [
  {
    path: '',
    component: CariPage
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CariPageRoutingModule {}
