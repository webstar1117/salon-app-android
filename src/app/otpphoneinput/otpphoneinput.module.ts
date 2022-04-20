import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { OtpphoneinputPageRoutingModule } from './otpphoneinput-routing.module';

import { OtpphoneinputPage } from './otpphoneinput.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    OtpphoneinputPageRoutingModule
  ],
  declarations: [OtpphoneinputPage]
})
export class OtpphoneinputPageModule {}
