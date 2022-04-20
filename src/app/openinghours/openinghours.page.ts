import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-openinghours',
  templateUrl: './openinghours.page.html',
  styleUrls: ['./openinghours.page.scss'],
})
export class OpeninghoursPage implements OnInit {
  
  day: any = 'Monday';
  open: any = '08:00 AM';
  close: any = '08:00 PM';
  opening_hours: any = [];
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
      this.salon_id = params.salon_id;
    }
    this.getSalonDetail();
  }

  getSalonDetail(){
    this.http.get(this.apiUrl+"salon-detail/"+this.salon_id, this.httpOptions)
    .subscribe(res => {
      console.log(res);
      if(res["status"] == 200){
        this.opening_hours = res["data"]["salon"]["opening_hours"];
      }
    }, (err) => {
      console.log(err);
    });
  }

  saveOpeningHours(){
    var data = {
      salon_id: this.salon_id,
      opening_hours: this.opening_hours
    }
    this.http.post(this.apiUrl+"business/add-opening-hours", JSON.stringify(data), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.toastMessage(res["message"]);
        this.navCtrl.navigateForward('businessprofile');
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
