import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConvertPage } from './convert.page';

const routes: Routes = [
  {
    path: '',
    component: ConvertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConvertPageRoutingModule {}
