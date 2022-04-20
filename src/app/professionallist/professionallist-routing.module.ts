import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfessionallistPage } from './professionallist.page';

const routes: Routes = [
  {
    path: '',
    component: ProfessionallistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessionallistPageRoutingModule {}
