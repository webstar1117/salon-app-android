import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { NgCalendarModule  } from 'ionic2-calendar';
import { PaymentmodalPageRoutingModule } from './paymentmodal-routing.module';

import { PaymentmodalPage } from './paymentmodal.page';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    NgCalendarModule,
    IonicModule,
    HttpClientModule,
    PaymentmodalPageRoutingModule,
  ],
  declarations: [PaymentmodalPage]
})
export class PaymentmodalPageModule {}
