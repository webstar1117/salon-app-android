import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Bankaccount2Page } from './bankaccount2.page';

const routes: Routes = [
  {
    path: '',
    component: Bankaccount2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Bankaccount2PageRoutingModule {}
