import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicemodalPageRoutingModule } from './servicemodal-routing.module';

import { ServicemodalPage } from './servicemodal.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicemodalPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ServicemodalPage]
})
export class ServicemodalPageModule {}
