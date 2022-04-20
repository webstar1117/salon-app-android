import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController, ToastController, Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { SearchmodalPage } from '../searchmodal/searchmodal.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  city: string = "Location";
  country:string = "location"
  expand: boolean = false;
  services: any;
  popular: any;
  marker: any;
  address: string;
  address2: string;
  guest: boolean = true;
  imageUrl = 'https://hairday.app/assets/images/service-types/';
  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private platform: Platform ) { }

  ngOnInit() {
    this.http.get(this.apiUrl+"service-types", this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.services = res["data"]["service_types"];
        this.popular = res["data"]["popular_searchs"];
      }
    }, (err) => {
      console.log(err);
    });
    if(localStorage.getItem('token')){
      this.guest = false;
    }
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      if(localStorage.getItem('location') == null){
        // var loc = this;
        // const alert = await this.alertCtrl.create({
        //   cssClass: "my-alert",
        //   header: 'Allow "App" to use your location',
        //   message: '<p>Your precise location is used to show your position on the map, get directions, estimate travel times and improve search results</p><div #map id="map"></div>',
        //   buttons: [
        //     {
        //       text: 'Allow',
        //       handler: () => {
        //         sessionStorage.setItem('location', 'New York');
        //         loc.city = sessionStorage.getItem('location');
        //       }
        //     }, {
        //       text: 'Allow While Using the App',
        //       handler: () => {
        //         localStorage.setItem('location', 'New York');
        //         loc.city = localStorage.getItem('location');
        //       }
        //     }, {
        //       text: 'Don\' Allow',
        //       role: 'cancel',
        //       handler: () => {
        //         localStorage.setItem('location', 'New York');
        //         loc.city = localStorage.getItem('location');
        //       }
        //     }
        //   ]
        // });

        // alert.present().then(() => {
        //   this.loadMap();
        // });

        this.currentLocation();
      }else{
        var location = localStorage.getItem('location');
        this.city = "saved";
        let latLng = JSON.parse(location);
        this.getAddressFromCoords(latLng.lat, latLng.lng);
      }
    });
  }

  currentLocation(){
    this.city = "not saved";
    this.geolocation.getCurrentPosition().then((resp) => {   
      var latitude = resp.coords.latitude;
      var longitude = resp.coords.longitude;
      this.getAddressFromCoords(latitude, longitude);
      let latLng = {
        "lat": latitude,
        "lng": longitude
      }
      this.city = "current";
      localStorage.setItem('location', JSON.stringify(latLng));
    }).catch((error) => {
      this.city="error";
      console.log('Error getting location', error);
    });   
  }
  
  getAddressFromCoords(lattitude, longitude) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
    .then((result: NativeGeocoderResult[]) => {
      console.log( "location result =====>" ,  JSON.stringify(result));
      this.address = "";
      this.address2 = "";
      let responseAddress = [];
      let countryname=[] ;
      for (let [key, value] of Object.entries(result[0].locality )) {
        if (value.length > 0)
          responseAddress.push(value);
      }
      for (let [key, data] of Object.entries(result[0].countryName)) {
        if (data.length > 0)
          countryname.push(data);
      }
      for (let value of countryname) {
        this.address2 += value;
      }
      this.country = this.address2;

      console.log(responseAddress);        
      // responseAddress.reverse();
      for (let value of responseAddress) {
        this.address += value;
      }
      // this.address = this.address.slice(0, -2);
      this.city = this.address;
    })
    .catch((error: any) => {
      this.address = "Address Not Available!";
    });

  }

  onScroll(event) {
    this.expand = false;
  }

  async searchbar() {
    this.expand = true;

    const modal = await this.modalCtrl.create({
      component: SearchmodalPage,
      componentProps: {popular: this.popular, service: ""},
      cssClass: 'searchmodal',
      mode:'ios',
      swipeToClose:true,
      presentingElement: await this.modalCtrl.getTop()
    });
    
    return await modal.present();
  }

  goSearchresult(type, name){
    this.navCtrl.navigateForward('searchresult',{state: {service_type: type, service: name, popular: this.popular}});
  }

  goProfile(){
    if(localStorage.getItem("token") != null){
      this.navCtrl.navigateForward('profile');
    }
  }

  async toastMessage(msg){
    const toast = await this.toastCtrl.create({
      message: msg,
      cssClass: 'ion-text-center',
      duration: 2000
    });
    toast.present();
  }

}
