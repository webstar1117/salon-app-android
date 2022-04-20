import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';

@Component({
  selector: 'app-profilesetting',
  templateUrl: './profilesetting.page.html',
  styleUrls: ['./profilesetting.page.scss'],
})
export class ProfilesettingPage implements OnInit {
  
  fname: string;
  lname: string;
  phone: string;
  avatar: any;
  avatarUrl = 'assets/imgs/user.png';
  
  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private http: HttpClient,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this.http.post(this.apiUrl+"profile", JSON.stringify({api_token: localStorage.getItem('token')}), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.fname = res["data"]["user"]["firstname"];
        this.lname = res["data"]["user"]["lastname"];
        this.phone = res["data"]["user"]["phone"];
        this.avatar = res["data"]["user"]["avatar"];
        if(this.avatar != null){
          this.avatarUrl = 'https://hairday.app/assets/images/avatars/'+this.avatar;
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  saveProfile(){
    var user = {
      api_token: localStorage.getItem('token'),
      firstname: this.fname,
      lastname: this.lname,
      phone: this.phone
    }
    this.http.post(this.apiUrl+"profile/update", JSON.stringify(user), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.toastMessage(res["message"]);
        this.navCtrl.navigateBack('profile');
      }else{
        for(let key in res["message"]){
          this.toastMessage(res["message"][key]);
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  async changeImage(){
    const modal = await this.modalCtrl.create({
      component: ImagemodalPage,
      componentProps: {avatar: this.avatar, type: 'profile'},
      cssClass: 'imagemodal',
      mode:'ios',
      swipeToClose:true,
      presentingElement: await this.modalCtrl.getTop()
    });

    modal.onDidDismiss()
    .then((data:any) => {
      this.getProfile();
    });
    
    return await modal.present();
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
