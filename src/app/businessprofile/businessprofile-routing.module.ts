import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessprofilePage } from './businessprofile.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessprofilePageRoutingModule {}
