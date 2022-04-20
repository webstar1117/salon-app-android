import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComparePageRoutingModule } from './compare-routing.module';

import { ComparePage } from './compare.page';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComparePageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [ComparePage]
})
export class ComparePageModule {}
