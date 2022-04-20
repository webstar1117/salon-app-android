import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpinputPage } from './otpinput.page';

const routes: Routes = [
  {
    path: '',
    component: OtpinputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpinputPageRoutingModule {}
