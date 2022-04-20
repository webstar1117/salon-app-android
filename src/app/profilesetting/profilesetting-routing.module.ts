import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilesettingPage } from './profilesetting.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilesettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilesettingPageRoutingModule {}
