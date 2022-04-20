import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectProfessionalsPage } from './selectProfessionals.page';

const routes: Routes = [
  {
    path: '',
    component: SelectProfessionalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectProfessionalsPageRoutingModule {}
