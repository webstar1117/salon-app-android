import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { BusinessPageRoutingModule } from './business-routing.module';

import { BusinessPage } from './business.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    BusinessPageRoutingModule
  ],
  declarations: [BusinessPage]
})
export class BusinessPageModule {}
