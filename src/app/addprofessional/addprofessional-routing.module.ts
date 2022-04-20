import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddprofessionalPage } from './addprofessional.page';

const routes: Routes = [
  {
    path: '',
    component: AddprofessionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddprofessionalPageRoutingModule {}
