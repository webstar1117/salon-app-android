import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
  
  salon_id: any=2;
  fname: string;
  lname: string;
  phone: string;
  birth: string;
  ssn: any;
  
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
    }

    this.http.get(this.apiUrl+"business/get-banks?salon_id="+this.salon_id)
    .subscribe(res => {
      if(res["status"] == 200){
        var data = res["data"][0];
        this.fname = data.first_name;
        this.lname = data.last_name;
        this.phone = data.phone_number;
        this.birth = data.date_of_birth;
        this.ssn = data.last_4_digits;
      }
    }, (err) => {
      console.log(err);
    });
  }
  
  nextStep(){
    var data = {
      first_name: this.fname,
      last_name: this.lname,
      phone_number: this.phone,
      date_of_birth: this.birth,
      last_4_digits: this.ssn
    }
    this.navCtrl.navigateForward('bankaccount1', {state: {salon_id: this.salon_id, data: data}});    
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
