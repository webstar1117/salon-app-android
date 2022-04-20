import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { BusinessprofilePageRoutingModule } from './businessprofile-routing.module';

import { BusinessprofilePage } from './businessprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    BusinessprofilePageRoutingModule
  ],
  declarations: [BusinessprofilePage]
})
export class BusinessprofilePageModule {}
