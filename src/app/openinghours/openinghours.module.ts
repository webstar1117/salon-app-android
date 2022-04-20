import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { OpeninghoursPageRoutingModule } from './openinghours-routing.module';

import { OpeninghoursPage } from './openinghours.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    OpeninghoursPageRoutingModule
  ],
  declarations: [OpeninghoursPage]
})
export class OpeninghoursPageModule {}
