import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcardmodalPageRoutingModule } from './addcardmodal-routing.module';

import { AddcardmodalPage } from './addcardmodal.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcardmodalPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [AddcardmodalPage]
})
export class AddcardmodalPageModule {}
