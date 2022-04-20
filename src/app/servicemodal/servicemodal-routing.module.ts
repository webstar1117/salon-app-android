import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicemodalPage } from './servicemodal.page';

const routes: Routes = [
  {
    path: '',
    component: ServicemodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicemodalPageRoutingModule {}
