import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConvertPageRoutingModule } from './convert-routing.module';

import { ConvertPage } from './convert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConvertPageRoutingModule
  ],
  declarations: [ConvertPage]
})
export class ConvertPageModule {}
