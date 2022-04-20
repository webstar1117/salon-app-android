import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-servicemodal',
  templateUrl: './servicemodal.page.html',
  styleUrls: ['./servicemodal.page.scss'],
})
export class ServicemodalPage implements OnInit {

  service: any;
  salon_id: any;
  price: any = "0.00";
  duration: any = "15";

  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private http: HttpClient,
    private toastCtrl: ToastController
  ) { }
 
  ngOnInit() {
    this.salon_id = this.navParams.get('salon_id');
    this.service = this.navParams.get('service');
  }

  setPrice(ev){
    this.price = ev.target.value;
  }

  setDuration(ev){
    this.duration = ev.target.value;
  }

  save(){
    var data = {
      salon_id: this.salon_id,
      price: this.price,
      duration: this.duration,
      service_type_id: this.service.service_type_id,
      service_name_id: this.service.service_name_id
    }
    this.http.post(this.apiUrl+"business/add-service", JSON.stringify(data), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.toastMessage(res["message"]);
        this.modalCtrl.dismiss({service: this.service.service_name_id});
      }else{
        if(Array.isArray(res["message"])){
          for(let key in res["message"]){
            this.toastMessage(res["message"][key]);
          }
        }else{
          this.toastMessage(res["message"]);
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  close()
  {
    this.modalCtrl.dismiss({service: ""});
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
