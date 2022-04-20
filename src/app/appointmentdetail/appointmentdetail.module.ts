import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppointmentdetailPageRoutingModule } from './appointmentdetail-routing.module';

import { AppointmentdetailPage } from './appointmentdetail.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    AppointmentdetailPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [AppointmentdetailPage]
})
export class AppointmentdetailPageModule {}
