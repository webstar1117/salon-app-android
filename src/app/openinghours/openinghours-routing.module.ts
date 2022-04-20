import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpeninghoursPage } from './openinghours.page';

const routes: Routes = [
  {
    path: '',
    component: OpeninghoursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpeninghoursPageRoutingModule {}
