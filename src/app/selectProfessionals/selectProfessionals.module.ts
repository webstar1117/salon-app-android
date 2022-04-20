import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { SelectProfessionalsPageRoutingModule } from './selectProfessionals-routing.module';

import { SelectProfessionalsPage } from './selectProfessionals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    SelectProfessionalsPageRoutingModule
  ],
  declarations: [SelectProfessionalsPage]
})
export class SelectProfessionalsPageModule {}
