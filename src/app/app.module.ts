import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchmodalPageModule } from './searchmodal/searchmodal.module';
import { PaysuccessPageModule } from './modals/paysuccess/paysuccess.module';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { ApplePay } from '@ionic-native/apple-pay/ngx'
import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ 
    FormsModule,  
    BrowserModule, IonicModule.forRoot({
    mode:'md'
  }), AppRoutingModule,SearchmodalPageModule,PaysuccessPageModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),  
  AngularFirestoreModule,        
],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, GoogleMaps, Geolocation, NativeGeocoder, NavParams, ApplePay, Stripe],
  bootstrap: [AppComponent],
})
export class AppModule {}
