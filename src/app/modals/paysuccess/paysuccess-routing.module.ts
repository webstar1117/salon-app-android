import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaysuccessPage } from './paysuccess.page';

const routes: Routes = [
  {
    path: '',
    component: PaysuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaysuccessPageRoutingModule {}
