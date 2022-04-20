import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvailabilitiesPage } from './availabilities.page';

const routes: Routes = [
  {
    path: '',
    component: AvailabilitiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvailabilitiesPageRoutingModule {}
