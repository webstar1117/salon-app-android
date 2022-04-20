import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarmodalPage } from './calendarmodal.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarmodalPageRoutingModule {}
