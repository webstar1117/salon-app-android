import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { SearchresultPageRoutingModule } from './searchresult-routing.module';

import { SearchresultPage } from './searchresult.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    SearchresultPageRoutingModule
  ],
  declarations: [SearchresultPage]
})
export class SearchresultPageModule {}
