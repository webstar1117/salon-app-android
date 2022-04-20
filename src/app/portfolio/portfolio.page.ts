import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppointmentmodalPage } from '../appointmentmodal/appointmentmodal.page';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss'],
})
export class PortfolioPage implements OnInit {
    
  options = {
    initialSlide: 0,
    slidesPerView:3,
  };

  salon_id: any;
  service_id: any;
  professional_id: any = 1;
  category:any = 'portfolio';
  professionals: any;
  guest: boolean = true;
  professionalUrl = 'https://hairday.app/assets/images/professionals/';
  avatarUrl = 'https://hairday.app/assets/images/professional-avatars/';
  reviewUrl = 'https://hairday.app/assets/images/reviews/';
  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private navCtrl: NavController,
    private router: Router,
    private modalCtrl: ModalController,
    private http: HttpClient,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    var params = this.router.getCurrentNavigation().extras.state;
    if(params) {
      this.professional_id = params.professional_id;
      this.service_id = params.service_id;
      this.salon_id = params.salon_id;
    }

    this.http.get(this.apiUrl+"professional/"+this.professional_id, this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.professionals = [res["data"]["professional"]];
      }
    }, (err) => {
      console.log(err);
    });

    if(localStorage.getItem("token") != null){
      this.guest = false;
    }
  }

  segmentChanged(category)
  {
    this.category = category;
  }
  
  dateStringify(dateString){
    var date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: "numeric"});
  }

  addFavorite(){
    var professional = {professional_id: this.professional_id, api_token: localStorage.getItem('token')};
    this.http.post(this.apiUrl+"professional/favorite/add", JSON.stringify(professional), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.toastMessage(res["message"]);
      }else{
        for(let key in res["message"]){
          this.toastMessage(res["message"][key]);
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  async appointment(){
    const modal = await this.modalCtrl.create({
      component: AppointmentmodalPage,
      componentProps: {multi: false, professional_id: this.professional_id, service_id: this.service_id, salon_id: this.salon_id},
      cssClass: 'appointmodal',
      mode:'ios',
      swipeToClose:true,
      presentingElement: await this.modalCtrl.getTop()
    });

    modal.onDidDismiss()
    .then((data:any) => {
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
