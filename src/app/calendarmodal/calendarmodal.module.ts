import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgCalendarModule  } from 'ionic2-calendar';
import { CalendarmodalPageRoutingModule } from './calendarmodal-routing.module';

import { CalendarmodalPage } from './calendarmodal.page';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    NgCalendarModule,
    IonicModule,
    CalendarmodalPageRoutingModule,
  ],
  declarations: [CalendarmodalPage]
})
export class CalendarmodalPageModule {}
