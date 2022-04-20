import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { BusinesssetupPageRoutingModule } from './businesssetup-routing.module';

import { BusinesssetupPage } from './businesssetup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    BusinesssetupPageRoutingModule
  ],
  declarations: [BusinesssetupPage]
})
export class BusinesssetupPageModule {}
