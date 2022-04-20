import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentdetailPage } from './appointmentdetail.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentdetailPageRoutingModule {}
