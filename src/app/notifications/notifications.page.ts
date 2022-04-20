import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  push: any;
  email: any;
  sms: any;

  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private navCtrl: NavController, private http: HttpClient, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.http.post(this.apiUrl+"notification", JSON.stringify({api_token: localStorage.getItem('token')}), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        if(res["data"]["notification_push"] == 1){
          this.push = true;
        }else{
          this.push = false;
        }
        if(res["data"]["notification_email"] == 1){
          this.email = true;
        }else{
          this.email = false;
        }
        if(res["data"]["notification_sms"] == 1){
          this.sms = true;
        }else{
          this.sms = false;
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  setNotification(type){
    if(type == "push"){
      if(this.push){
        var status = 1;
      }else{
        var status = 0;
      }
      var key = "notification_push";
    }else if(type == "email"){
      if(this.email){
        var status = 1;
      }else{
        var status = 0;
      }
      var key = "notification_email";
    }else if(type == "sms"){
      if(this.sms){
        var status = 1;
      }else{
        var status = 0;
      }
      var key = "notification_sms";
    }
    var data = {
      api_token: localStorage.getItem('token'),
      key: key,
      status: status
    }
    this.http.post(this.apiUrl+"notification/change", JSON.stringify(data), this.httpOptions)
    .subscribe(res => {
      if(res["status"] !== 200){
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
