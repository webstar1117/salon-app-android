import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyappointmentsPageRoutingModule } from './myappointments-routing.module';

import { MyappointmentsPage } from './myappointments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyappointmentsPageRoutingModule
  ],
  declarations: [MyappointmentsPage]
})
export class MyappointmentsPageModule {}
