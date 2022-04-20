import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaysuccessPageRoutingModule } from './paysuccess-routing.module';

import { PaysuccessPage } from './paysuccess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaysuccessPageRoutingModule
  ],
  declarations: [PaysuccessPage]
})
export class PaysuccessPageModule {}
