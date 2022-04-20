import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AvailabilitiesPageRoutingModule } from './availabilities-routing.module';

import { AvailabilitiesPage } from './availabilities.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    AvailabilitiesPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [AvailabilitiesPage]
})
export class AvailabilitiesPageModule {}
