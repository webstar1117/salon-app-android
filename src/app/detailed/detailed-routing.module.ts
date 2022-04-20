import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailedPage } from './detailed.page';

const routes: Routes = [
  {
    path: '',
    component: DetailedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailedPageRoutingModule {}
