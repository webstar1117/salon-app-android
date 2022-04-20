import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { ProfessionalPageRoutingModule } from './professional-routing.module';

import { ProfessionalPage } from './professional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ProfessionalPageRoutingModule
  ],
  declarations: [ProfessionalPage]
})
export class ProfessionalPageModule {}
