import { Routes } from '@angular/router';
import { WelcomeComponent } from './modules/home/welcome/welcome.component';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: WelcomeComponent }, 
  {
    path: 'tariff-list',
    loadChildren: () =>
      import('./modules/tariff/tariff.module').then((m) => m.TariffModule),
  },
  { path: '**', redirectTo: 'home' }, 
 
 
];
