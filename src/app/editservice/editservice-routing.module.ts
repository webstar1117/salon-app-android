import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditservicePage } from './editservice.page';

const routes: Routes = [
  {
    path: '',
    component: EditservicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditservicePageRoutingModule {}
