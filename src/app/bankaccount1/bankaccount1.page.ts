import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bankaccount1',
  templateUrl: './bankaccount1.page.html',
  styleUrls: ['./bankaccount1.page.scss'],
})
export class Bankaccount1Page implements OnInit {
  
  salon_id: any;
  data: any;
  street: string;
  suite: string;
  city: string;
  state: any;
  zip: any;
  
  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private http: HttpClient,
    private router: Router,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    var params = this.router.getCurrentNavigation().extras.state;
    if(params){
      this.salon_id = params.salon_id;
      this.data = params.data;
    }
    this.http.get(this.apiUrl+"business/get-banks?salon_id="+this.salon_id)
    .subscribe(res => {
      if(res["status"] == 200){
        var data = res["data"][0];
        this.street = data.address;
        this.suite = data.address_2;
        this.city = data.city;
        this.state = data.state;
        this.zip = data.zip;
      }
    }, (err) => {
      console.log(err);
    });
  }

  nextstep(){
    this.data["address"] = this.street;
    this.data["address_2"] = this.suite;
    this.data["city"] = this.city;
    this.data["state"] = this.state;
    this.data["zip"] = this.zip;
    this.navCtrl.navigateForward('bankaccount2', {state: {salon_id: this.salon_id, data: this.data}});
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
