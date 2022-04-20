import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.page.html',
  styleUrls: ['./addclient.page.scss'],
})
export class AddclientPage implements OnInit {
  
  fname: any;
  lname: any;
  email: any;
  phone: any;
  salon_id: any = 1;
  isEmail: boolean = true;
  isPhone: boolean = true;
  
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
    let params = this.router.getCurrentNavigation().extras.state;
    if(params){
      this.salon_id = params.salon_id;
    }
   }

  emailCheck(){
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(this.email);
  }

  phoneCheck(){
    var regexp = new RegExp("^[0-9]{3}[- ][0-9]{3}[- ][0-9]{4}");
    return regexp.test(this.phone);
  }

  saveClient(){
    if(!this.emailCheck()){
      this.isEmail = false;
    }else{
      this.isEmail = true;
    }
    if(!this.phoneCheck()){
      this.isPhone = false
    }else{
      this.isPhone = true;
    }
    if(this.isEmail && this.isPhone){
      var data = {
        salon_id: this.salon_id,
        first_name: this.fname,
        last_name: this.lname,
        email: this.email,
        phone: this.phone
      }
      this.http.post(this.apiUrl+"business/add-client", JSON.stringify(data), this.httpOptions)
      .subscribe(res => {
        if(res["status"] == 200){
          this.toastMessage(res["message"]);
          this.navCtrl.navigateBack('clients');
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
