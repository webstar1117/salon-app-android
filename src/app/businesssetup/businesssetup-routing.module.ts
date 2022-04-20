import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinesssetupPage } from './businesssetup.page';

const routes: Routes = [
  {
    path: '',
    component: BusinesssetupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinesssetupPageRoutingModule {}
