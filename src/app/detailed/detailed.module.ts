import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailedPageRoutingModule } from './detailed-routing.module';

import { DetailedPage } from './detailed.page';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailedPageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [DetailedPage]
})
export class DetailedPageModule {}
