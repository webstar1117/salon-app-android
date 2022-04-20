import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchresultPage } from './searchresult.page';

const routes: Routes = [
  {
    path: '',
    component: SearchresultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchresultPageRoutingModule {}
