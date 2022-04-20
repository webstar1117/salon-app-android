import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-otpphoneinput',
  templateUrl: './otpphoneinput.page.html',
  styleUrls: ['./otpphoneinput.page.scss'],
})
export class OtpphoneinputPage implements OnInit {
  
  isEmail = true;
  email: string;
  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private navCtrl: NavController, private http: HttpClient, private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  sendEmail(){
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    this.isEmail = regexp.test(this.email);
    if(this.isEmail){
      var user = {email: this.email};
      this.http.post(this.apiUrl+"send-otp", JSON.stringify(user), this.httpOptions)
      .subscribe(res => {
        console.log(res);
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
    }else{
      this.isEmail = false;
    }
  }
  
  close(){
    this.navCtrl.navigateRoot('login');
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
