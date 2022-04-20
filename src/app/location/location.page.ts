import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  
  street: string;
  suite: string;
  city: string;
  state: any;
  zip: any;
  salon_id: any = 2;
  
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
      this.salon_id = params.salon_id
    }
    this.getSalonDetail();
  }

  getSalonDetail(){
    this.http.get(this.apiUrl+"salon-detail/"+this.salon_id, this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.street = res["data"]["salon"]["street"];
        this.suite = res["data"]["salon"]["suite"];
        this.city = res["data"]["salon"]["city"];
        this.state = res["data"]["salon"]["state"];
        this.zip = res["data"]["salon"]["zip_code"];
      }
    }, (err) => {
      console.log(err);
    });
  }

  saveLocation(){
    var data = {
      salon_id: this.salon_id,
      street: this.street,
      suite: this.suite,
      city: this.city,
      state: this.state,
      zip_code: this.zip
    }
    this.http.post(this.apiUrl+"business/add-address", JSON.stringify(data), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.toastMessage(res["message"]);
        this.navCtrl.navigateBack('businessprofile');
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
