import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { EditservicePageRoutingModule } from './editservice-routing.module';

import { EditservicePage } from './editservice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    EditservicePageRoutingModule
  ],
  declarations: [EditservicePage]
})
export class EditservicePageModule {}
