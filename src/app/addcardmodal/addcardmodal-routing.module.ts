import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcardmodalPage } from './addcardmodal.page';

const routes: Routes = [
  {
    path: '',
    component: AddcardmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcardmodalPageRoutingModule {}
