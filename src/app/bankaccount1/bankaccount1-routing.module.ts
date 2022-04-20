import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Bankaccount1Page } from './bankaccount1.page';

const routes: Routes = [
  {
    path: '',
    component: Bankaccount1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Bankaccount1PageRoutingModule {}
