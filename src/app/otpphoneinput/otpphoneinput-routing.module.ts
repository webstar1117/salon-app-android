import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpphoneinputPage } from './otpphoneinput.page';

const routes: Routes = [
  {
    path: '',
    component: OtpphoneinputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpphoneinputPageRoutingModule {}
