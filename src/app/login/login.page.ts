import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ptype: any = 'password';
  userEmail: string;
  password: string;
  isEmail = false;
  setPassword = false;
  checkPass = true;
  isExist: boolean = false;
  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),

  };

  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private googlePlus: GooglePlus,
    private fb: Facebook
  ) { }

  ngOnInit() {
  }



  emailCheck() {
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    this.isEmail = regexp.test(this.userEmail);
  }

  emailExist() {
    var user = { email: this.userEmail }
    this.http.post(this.apiUrl + "check-email", JSON.stringify(user), this.httpOptions)
      .subscribe(res => {
        if (res["status"] == 200) {
          this.isExist = true;
        } else {
          this.isExist = false;
        }
      }, (err) => {
        console.log(err);
      });
  }

  strongPass() {
    var strongRegex = new RegExp("^(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    this.checkPass = strongRegex.test(this.password);
  }

  nextStep() {
    if (this.setPassword == false) {
      this.setPassword = true;
    } else {
      if (this.checkPass) {
        var user = { email: this.userEmail, password: this.password }
        this.http.post(this.apiUrl + "login", JSON.stringify(user), this.httpOptions)
          .subscribe(res => {
            if (res["status"] == 200) {
              this.toastMessage(res["message"]);
              localStorage.setItem('token', res['data']['api_token']);
              this.navCtrl.navigateRoot('home');
            } else {
              for (let key in res["message"]) {
                this.toastMessage(res["message"][key]);
              }
            }
          }, (err) => {
            console.log(err);
          });
      }
    }
  }

  forgotPassword() {
    this.navCtrl.navigateRoot('otpphoneinput');
  }

  skip() {
    this.navCtrl.navigateRoot('home');
  }

  switchType() {
    if (this.ptype == 'password') {
      this.ptype = 'text';
    }

    else {
      this.ptype = 'password'
    }
  }

  withGoogle() {
    this.googlePlus.login({
      webClientId: '184564234091-o3hr1ci6cuq2mtv0jabqkta31dpmm0iq.apps.googleusercontent.com',
      offline: true,
    }).then((res: any) => {
      const data: any = [res]
      this.http.post(this.apiUrl + "login-social", {
        email: data[0].email
      })
        .subscribe(res => {
          if (res["status"] == 500) {
            this.toastMessage("logged in successfully");
            localStorage.setItem('token', res['data']['api_token']);
            localStorage.setItem('social', 'google');
            this.navCtrl.navigateRoot('home');
          } else {
            for (let key in res["message"]) {
              this.toastMessage(res["message"][key]);
            }
          }
        }, (err) => {
          console.log(err);
        });
    }).catch(err => {
      this.toastMessage("error: " + err);
    })
  }

  withFacebook() {
    const permissions = ["public_profile", "email"];
    this.fb.login(permissions)
      .then(res => {
        let userId = res.authResponse.userID;
        // Getting name and gender properties
        this.fb.api("/me?fields=name,email", permissions)
          .then(user => {
            const userEmail = [user]
            this.http.post(this.apiUrl + "login-social", { email: userEmail[0].email })
              .subscribe(res => {
                if (res["status"] == 500) {
                  this.toastMessage("logged in successfully");
                  localStorage.setItem('token', res['data']['api_token']);
                  localStorage.setItem('social', 'facebook');
                  this.navCtrl.navigateRoot('home');
                } else {
                  for (let key in res["message"]) {
                    this.toastMessage(res["message"][key]);
                  }
                }
              }, (err) => {
                console.log(err);
              });
          })
      }, error => {
        this.toastMessage("error: " + error);
      });
  }

  async toastMessage(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      cssClass: 'ion-text-center',
      duration: 2000
    });
    toast.present();
  }

}
