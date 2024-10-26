import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { TariffListComponent } from './screens/tariff-list/tariff-list.component';

const routes: Routes = [
    {
        path: '',
        component: TariffListComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TariffRoutingModule { }
