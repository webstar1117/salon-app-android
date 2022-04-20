import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentmodalPage } from './paymentmodal.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentmodalPageRoutingModule {}
