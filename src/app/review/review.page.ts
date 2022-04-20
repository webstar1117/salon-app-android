import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
    
  salon_id: any;
  service_id: any;
  professional_id: any;
  title: any;
  feedback: any;
  rate: any;
  image: any;
  imageUrl: any;

  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  
  constructor(
    private navCtrl: NavController, 
    private router: Router,
    private http: HttpClient,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    var params = this.router.getCurrentNavigation().extras.state;
    if(params){
      this.salon_id = params.salon_id;
      this.service_id = params.service_id;
      this.professional_id = params.professional_id;
    }
  }

  setRate(star){
    this.rate = star;
  }

  async uploadImage(){
    const modal = await this.modalCtrl.create({
      component: ImagemodalPage,
      componentProps: {avatar: null, type: "review"},
      cssClass: 'imagemodal',
      mode:'ios',
      swipeToClose:true,
      presentingElement: await this.modalCtrl.getTop()
    });

    modal.onDidDismiss()
    .then((data:any) => {
      this.image = data.data.avatar;
      if(this.image != null){
        this.readFile(this.image);
      }
    });
    
    return await modal.present();
  }

  readFile(file){
    let reader = new FileReader();
    let point = this;
    reader.onload = (_event) => { 
      point.imageUrl = reader.result;
    }
    reader.readAsDataURL(file);
  }

  saveReview(){
    let formData = new FormData();
    formData.append("api_token", localStorage.getItem('token'));
    formData.append("salon_id", this.salon_id);
    formData.append("professional_id", this.professional_id);
    formData.append("service_id", this.service_id);
    formData.append("name", this.title);
    formData.append("rate", this.rate);
    formData.append("description", this.feedback);
    formData.append("image", this.image);

    this.http.post(this.apiUrl+"my-appointment/add-review", formData)
      .subscribe(res => {
        if(res["status"] == 200){
          this.toastMessage(res["message"]);
          this.navCtrl.navigateForward('myappointments');
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
