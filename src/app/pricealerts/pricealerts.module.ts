import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PricealertsPageRoutingModule } from './pricealerts-routing.module';

import { PricealertsPage } from './pricealerts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PricealertsPageRoutingModule
  ],
  declarations: [PricealertsPage]
})
export class PricealertsPageModule {}
