import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-businesssetup',
  templateUrl: './businesssetup.page.html',
  styleUrls: ['./businesssetup.page.scss'],
})
export class BusinesssetupPage implements OnInit {
  
  salon_id: any = 12;
  street: string;
  suite: string;
  city: string;
  state: any;
  zip: any;
  day: any = 'Monday';
  open: any = '08:00 AM';
  close: any = '08:00 PM';
  opening_hours: any = [];
  
  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private router: Router,
    private http: HttpClient,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    var params = this.router.getCurrentNavigation().extras.state;
    if(params){
      this.salon_id = params.salon_id;
    }
  }

  saveProfile(){
    var address = {
      salon_id: this.salon_id,
      street: this.street,
      suite: this.suite,
      city: this.city,
      state: this.state,
      zip: this.zip
    }
    this.http.post(this.apiUrl+"business/add-address", JSON.stringify(address), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.toastMessage(res["message"]);
      }else{
        for(let key in res["message"]){
          this.toastMessage(res["message"][key]);
        }
      }
    }, (err) => {
      console.log(err);
    });
    var hours = {
      salon_id: this.salon_id,
      opening_hours: this.opening_hours
    }
    this.http.post(this.apiUrl+"business/add-opening-hours", JSON.stringify(hours), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.toastMessage(res["message"]);
      }else{
        for(let key in res["message"]){
          this.toastMessage(res["message"][key]);
        }
      }
    }, (err) => {
      console.log(err);
    });
    this.navCtrl.navigateForward('mybusiness');
  }

  addOpeningHours(){
    let opening_hour = {
      day: this.day,
      open_time: this.open,
      close_time: this.close
    }
    this.opening_hours.push(opening_hour);
  }

  removeOpeningHour(key){
    this.opening_hours.splice(key, 1);
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
