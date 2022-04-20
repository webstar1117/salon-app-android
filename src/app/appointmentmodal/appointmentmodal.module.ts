import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { NgCalendarModule  } from 'ionic2-calendar';
import { AppointmentmodalPageRoutingModule } from './appointmentmodal-routing.module';

import { AppointmentmodalPage } from './appointmentmodal.page';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    NgCalendarModule,
    IonicModule,
    HttpClientModule,
    AppointmentmodalPageRoutingModule,
  ],
  declarations: [AppointmentmodalPage]
})
export class AppointmentmodalPageModule {}
