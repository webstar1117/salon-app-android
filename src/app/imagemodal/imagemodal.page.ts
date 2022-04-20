import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-imagemodal',
  templateUrl: './imagemodal.page.html',
  styleUrls: ['./imagemodal.page.scss'],
})
export class ImagemodalPage implements OnInit {

  avatarUrl: any;
  hasImage: boolean = false;
  image: any;
  type: any;
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
    var avatar = this.navParams.get('avatar');
    this.type = this.navParams.get('type');
    if(avatar != null){
      if(this.type == 'profile'){
        this.avatarUrl = 'https://hairday.app/assets/images/avatars/'+avatar;
        this.hasImage = true;
      }else{
        this.readFile(avatar);
      }
    }else{
      this.avatarUrl = 'assets/imgs/noImage.png';
    }
  }

  uploadImage(){
    let btn = document.getElementById('photo');
    btn.click();
  }

  saveImage(event){
    this.image = event.target.files[0];
    this.readFile(this.image);
  }

  readFile(file){
    let reader = new FileReader();
    let point = this;
    reader.onload = (_event) => { 
      point.avatarUrl = reader.result;
      point.hasImage = true;
    }
    reader.readAsDataURL(file);
  }

  nextStep(){
    if(this.type == 'profile'){
      if(this.image == undefined){
        this.toastMessage('Please upload profile image');
      }else{
        let formData = new FormData();
        formData.append("api_token", localStorage.getItem('token'));
        formData.append("image", this.image);
    
        this.http.post(this.apiUrl+"profile/change-image", formData)
          .subscribe(res => {
            if(res["status"] == 200){
              this.toastMessage(res["message"]);
              this.modalCtrl.dismiss();
            }else{
              for(let key in res["message"]){
                this.toastMessage(res["message"][key]);
              }
            }
          }, (err) => {
            console.log(err);
          });
        }
    }else if(this.type == 'business' || this.type == 'professional' || this.type == "portfolio" || this.type == "review"){
      this.modalCtrl.dismiss({avatar: this.image});
    }else if(this.type == 'salon'){
      var salon_id = this.navParams.get('salon_id');
      if(this.image == undefined){
        this.toastMessage('Please upload salon image');
      }else{
        let formData = new FormData();
        formData.append("salon_id", salon_id);
        formData.append("image", this.image);  
        this.http.post(this.apiUrl+"business/upload-business-image", formData)
          .subscribe(res => {
            if(res["status"] == 200){
              this.toastMessage(res["message"]);
              this.modalCtrl.dismiss();
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
  }

  close()
  {
    this.modalCtrl.dismiss({avatar: null});
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
