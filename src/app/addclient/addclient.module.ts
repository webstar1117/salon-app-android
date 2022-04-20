import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AddclientPageRoutingModule } from './addclient-routing.module';

import { AddclientPage } from './addclient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    AddclientPageRoutingModule
  ],
  declarations: [AddclientPage]
})
export class AddclientPageModule {}
