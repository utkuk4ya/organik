import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'dash',  loadChildren: () => import('./dash/dash.module').then(m => m.DashModule) },
  { path: 'cari',  loadChildren: () => import('./cari/cari.module').then(m => m.CariPageModule) },
  { path: 'sayac', loadChildren: () => import('./sayaclar/sayac.module').then(m => m.SayacPageModule) },

  // NEW
  {
    path: 'aboneler',
    children: [
      { path: 'elk', loadChildren: () => import('./pages/aboneler/elk/elk.module').then(m => m.ElkPageModule) },
      { path: 'su',  loadChildren: () => import('./pages/aboneler/su/su.module').then(m => m.SuPageModule) },
      { path: 'gaz', loadChildren: () => import('./pages/aboneler/gaz/gaz.module').then(m => m.GazPageModule) },
      { path: '', redirectTo: 'elk', pathMatch: 'full' },
      
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
