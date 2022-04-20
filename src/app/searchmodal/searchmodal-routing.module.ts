import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchmodalPage } from './searchmodal.page';

const routes: Routes = [
  {
    path: '',
    component: SearchmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchmodalPageRoutingModule {}
