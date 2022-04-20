import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AvailabilityPageRoutingModule } from './availability-routing.module';

import { AvailabilityPage } from './availability.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    AvailabilityPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [AvailabilityPage]
})
export class AvailabilityPageModule {}
