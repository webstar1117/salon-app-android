import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController, NavParams } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  
  salon: any;
  description: any;
  phone: string;
  website: string;
  instagram: string;
  tiktok: any;
  basic_amenities: any;
  basic_safeties: any;
  amenities = [];
  safeties = [];
  policy: string;
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
    this.http.get(this.apiUrl+"business/get-amenities")
    .subscribe(res => {
      if(res["status"] == 200){
        this.basic_amenities = res["data"][0];
        console.log(this.basic_amenities);
      }
    }, (err) => {
      console.log(err);
    });
    this.http.get(this.apiUrl+"business/get-health-and-safeties")
    .subscribe(res => {
      if(res["status"] == 200){
        this.basic_safeties = res["data"][0];
      }
    }, (err) => {
      console.log(err);
    });
  }

  getSalonDetail(){
    this.http.get(this.apiUrl+"salon-detail/"+this.salon_id, this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.description = res["data"]["salon"]["description"];
        this.phone = res["data"]["salon"]["phone"];
        this.website = res["data"]["salon"]["website"];
        this.instagram = res["data"]["salon"]["instagram"];
        this.tiktok = res["data"]["salon"]["tictok"];
        this.policy = res["data"]["salon"]["cancellation_policy"];
        var safeties = res["data"]["salon"]["health_and_safeties"];
        for(var i in safeties){
          this.safeties.push(safeties[i].id);
        }
        var amenities = res["data"]["salon"]["amenities"];
        for(var j in amenities){
          this.amenities.push(amenities[j].id);
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  setAmenities(amenity){
    if(this.amenities.indexOf(amenity) == -1){
      this.amenities.push(amenity);
    }else{
      this.amenities.splice(this.amenities.indexOf(amenity), 1);
    }
  }

  setSafety(safety){
    if(this.safeties.indexOf(safety) == -1){
      this.safeties.push(safety);
    }else{
      this.safeties.splice(this.safeties.indexOf(safety), 1);
    }
  }

  saveAbout(){
    var data = {
      salon_id: this.salon_id,
      description: this.description,
      phone: this.phone,
      website: this.website,
      instagram: this.instagram,
      tictok: this.tiktok,
      amenity_ids: this.amenities,
      health_and_safety_ids: this.safeties,
      cancellation_policy: this.policy
    }
    this.http.post(this.apiUrl+"business/add-about", JSON.stringify(data), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.toastMessage(res["message"]);
        this.navCtrl.navigateBack('businessprofile');
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

  async toastMessage(msg){
    const toast = await this.toastCtrl.create({
      message: msg,
      cssClass: 'ion-text-center',
      duration: 2000
    });
    toast.present();
  }

}
