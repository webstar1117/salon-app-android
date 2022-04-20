import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { ImagemodalPageRoutingModule } from './imagemodal-routing.module';

import { ImagemodalPage } from './imagemodal.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ImagemodalPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ImagemodalPage]
})
export class ImagemodalPageModule {}
