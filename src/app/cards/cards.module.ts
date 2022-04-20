import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { CardsPageRoutingModule } from './cards-routing.module';

import { CardsPage } from './cards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    CardsPageRoutingModule
  ],
  declarations: [CardsPage]
})
export class CardsPageModule {}
