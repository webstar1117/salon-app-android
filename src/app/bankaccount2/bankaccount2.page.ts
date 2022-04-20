import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bankaccount2',
  templateUrl: './bankaccount2.page.html',
  styleUrls: ['./bankaccount2.page.scss'],
})
export class Bankaccount2Page implements OnInit {
  
  salon_id: any;
  data: any;
  holder: string;
  routing: string;
  account: string;
  
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
        this.holder = data.holder_name;
        this.routing = data.routing_number;
        this.account = data.account_number;
      }
    }, (err) => {
      console.log(err);
    });
  }

  saveBankAccount(){
    this.data["salon_id"] = this.salon_id;
    this.data["holder_name"] = this.holder;
    this.data["routing_number"] = this.routing;
    this.data["account_number"] = this.account;
    this.http.post(this.apiUrl+"business/add-banks", JSON.stringify(this.data), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.toastMessage(res["message"]);
        this.navCtrl.navigateBack('menu');
      }else{
        for(let key in res["message"]){
          this.toastMessage(res["message"][key]);
        }
      }
    }, (err) => {
      console.log(err);
    });
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
