import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AddprofessionalPageRoutingModule } from './addprofessional-routing.module';

import { AddprofessionalPage } from './addprofessional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    AddprofessionalPageRoutingModule
  ],
  declarations: [AddprofessionalPage]
})
export class AddprofessionalPageModule {}
