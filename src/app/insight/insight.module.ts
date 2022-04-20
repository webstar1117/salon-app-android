import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsightPageRoutingModule } from './insight-routing.module';

import { InsightPage } from './insight.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsightPageRoutingModule
  ],
  declarations: [InsightPage]
})
export class InsightPageModule {}
