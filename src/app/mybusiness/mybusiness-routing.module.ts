import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MybusinessPage } from './mybusiness.page';

const routes: Routes = [
  {
    path: '',
    component: MybusinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MybusinessPageRoutingModule {}
