import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { Bankaccount2PageRoutingModule } from './bankaccount2-routing.module';

import { Bankaccount2Page } from './bankaccount2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    Bankaccount2PageRoutingModule
  ],
  declarations: [Bankaccount2Page]
})
export class Bankaccount2PageModule {}
