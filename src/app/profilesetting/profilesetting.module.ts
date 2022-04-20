import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { ProfilesettingPageRoutingModule } from './profilesetting-routing.module';

import { ProfilesettingPage } from './profilesetting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ProfilesettingPageRoutingModule
  ],
  declarations: [ProfilesettingPage]
})
export class ProfilesettingPageModule {}
