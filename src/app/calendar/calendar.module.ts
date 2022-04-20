import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgCalendarModule  } from 'ionic2-calendar';
import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    NgCalendarModule,
    IonicModule,
    CalendarPageRoutingModule,
  ],
  declarations: [CalendarPage]
})
export class CalendarPageModule {}
