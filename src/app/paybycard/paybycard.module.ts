import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaybycardPageRoutingModule } from './paybycard-routing.module';

import { PaybycardPage } from './paybycard.page';

import {SwiperModule} from 'swiper/angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaybycardPageRoutingModule,
    SwiperModule
    
  ],
  declarations: [PaybycardPage]
})
export class PaybycardPageModule {}
