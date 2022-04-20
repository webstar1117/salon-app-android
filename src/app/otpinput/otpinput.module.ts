import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { OtpinputPageRoutingModule } from './otpinput-routing.module';

import { OtpinputPage } from './otpinput.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    OtpinputPageRoutingModule
  ],
  declarations: [OtpinputPage]
})
export class OtpinputPageModule {}
