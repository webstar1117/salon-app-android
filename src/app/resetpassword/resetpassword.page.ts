import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {
  
  ptype:any= 'password';
  email: string;
  password: string;
  checkPass = true;
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

  switchType()
  {
    if(this.ptype == 'password')
    {
      this.ptype = 'text';
    }else{
      this.ptype = 'password'
    }
  }

  resetPassword()
  {
    var strongRegex = new RegExp("^(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    this.checkPass = strongRegex.test(this.password);
    if(this.checkPass){
      var user = {email: this.email, password: this.password};
      this.http.post(this.apiUrl+"reset-password", JSON.stringify(user), this.httpOptions)
      .subscribe(res => {
        if(res["status"] == 200){
          localStorage.setItem('token', JSON.stringify(res['data']['api_token']));
          this.toastMessage(res["message"]);
          this.navCtrl.navigateRoot('home');
        }else{
          for(let key in res["message"]){
            this.toastMessage(res["message"][key]);
          }
        }
      }, (err) => {
        console.log(err);
      });
    }
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
