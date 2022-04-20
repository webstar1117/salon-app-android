import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PricealertsPage } from './pricealerts.page';

const routes: Routes = [
  {
    path: '',
    component: PricealertsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PricealertsPageRoutingModule {}
