import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddclientPage } from './addclient.page';

const routes: Routes = [
  {
    path: '',
    component: AddclientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddclientPageRoutingModule {}
