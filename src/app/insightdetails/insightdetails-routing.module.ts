import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsightdetailsPage } from './insightdetails.page';

const routes: Routes = [
  {
    path: '',
    component: InsightdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsightdetailsPageRoutingModule {}
