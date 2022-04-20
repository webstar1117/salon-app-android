import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { ProfessionallistPageRoutingModule } from './professionallist-routing.module';

import { ProfessionallistPage } from './professionallist.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ProfessionallistPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ProfessionallistPage]
})
export class ProfessionallistPageModule {}
