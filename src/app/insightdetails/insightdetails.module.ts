import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsightdetailsPageRoutingModule } from './insightdetails-routing.module';

import { InsightdetailsPage } from './insightdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsightdetailsPageRoutingModule
  ],
  declarations: [InsightdetailsPage]
})
export class InsightdetailsPageModule {}
