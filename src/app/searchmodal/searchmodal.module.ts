import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { SearchmodalPageRoutingModule } from './searchmodal-routing.module';

import { SearchmodalPage } from './searchmodal.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    SearchmodalPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SearchmodalPage]
})
export class SearchmodalPageModule {}
