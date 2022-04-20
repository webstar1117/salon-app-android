import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editservice',
  templateUrl: './editservice.page.html',
  styleUrls: ['./editservice.page.scss'],
})
export class EditservicePage implements OnInit {
  
  description: any = "Looking for a quick haircut? This is the one for you.";
  service: any;
  name: string = "Adult cut";
  price: string = "50";
  duration: string = "30 min";
  display: boolean = false;
  
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
      this.service = params.service;
      this.name = this.service.service_name.name;
      this.price = this.service.price;
      this.duration = this.service.duration + " min";
      this.description = this.service.description;
    }
    console.log(this.service);
  }

  deleteService(){
    var data = {
      service_id: this.service.id
    }
    this.http.post(this.apiUrl+"business/delete-service", JSON.stringify(data), this.httpOptions)
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

  saveService(){
    var duration = this.duration.slice(0, this.duration.indexOf('min')-1);
    var data = {
      description: this.description,
      service_id: this.service.id,
      price: this.price,
      duration: duration
    }
    this.http.post(this.apiUrl+"business/edit-service", JSON.stringify(data), this.httpOptions)
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
