import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AddservicesPageRoutingModule } from './addservices-routing.module';

import { AddservicesPage } from './addservices.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    AddservicesPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [AddservicesPage]
})
export class AddservicesPageModule {}
