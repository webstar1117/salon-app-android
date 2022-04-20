import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { Bankaccount1PageRoutingModule } from './bankaccount1-routing.module';

import { Bankaccount1Page } from './bankaccount1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    Bankaccount1PageRoutingModule
  ],
  declarations: [Bankaccount1Page]
})
export class Bankaccount1PageModule {}
