import { RouterModule, Routes } from '@angular/router';

import { HelloComponent } from './hello/hello.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: HelloComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
