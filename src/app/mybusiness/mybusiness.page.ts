import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-mybusiness',
  templateUrl: './mybusiness.page.html',
  styleUrls: ['./mybusiness.page.scss'],
})
export class MybusinessPage implements OnInit {
  
  salon_id: any;
  businesses: any;

  logoUrl = 'https://hairday.app/assets/images/salon-logos/';
  avatarUrl: any = 'assets/imgs/user.png';
  
  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private http: HttpClient,
    private toastCtrl: ToastController) { }

  ngOnInit() { }

  ionViewWillEnter(): void {
    this.getBusinesses();
  }

  getBusinesses(){
    let token = localStorage.getItem('token');
    this.http.get(this.apiUrl+"business/get-businesses?api_token=" + token)
    .subscribe(res => {
      if(res["status"] == 200){
        this.businesses = res["data"];
      }
    }, (err) => {
      console.log(err);
    });
  }

  addBusiness(){
    this.navCtrl.navigateForward('business');
  }

  selectBusiness(salon_id){
    this.navCtrl.navigateForward('menu', {state: {salon_id: salon_id}});
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
