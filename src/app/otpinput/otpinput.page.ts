import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-otpinput',
  templateUrl: './otpinput.page.html',
  styleUrls: ['./otpinput.page.scss'],
})
export class OtpinputPage implements OnInit {

  email: any;
  code1: any;
  code2: any;
  code3: any;
  code4: any;
  code5: any;
  code6: any;
  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  
  constructor(private navCtrl: NavController, private http: HttpClient, private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
    var params = this.router.getCurrentNavigation().extras.state;
    if(params) {
      this.email = params.email;
    }
  }

  async verify()
  {
    var code = this.code1+this.code2+this.code3+this.code4+this.code5+this.code6;
    var user = {email: this.email, otp: code};
    this.http.post(this.apiUrl+"verify-otp", JSON.stringify(user), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.toastMessage(res["message"]);
        this.navCtrl.navigateForward('resetpassword', {state: {email: this.email}});
      }else{
        for(let key in res["message"]){
          this.toastMessage(res["message"][key]);
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  async resend()
  {
    var user = {email: this.email};
    this.http.post(this.apiUrl+"send-otp", JSON.stringify(user), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.toastMessage(res["message"]);
        this.navCtrl.navigateForward('otpinput', {state: {email: this.email}});
      }else{
        for(let key in res["message"]){
          this.toastMessage(res["message"][key]);
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  next(el)
  {
    el.setFocus();
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
