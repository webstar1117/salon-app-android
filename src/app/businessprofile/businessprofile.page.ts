import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';

@Component({
  selector: 'app-businessprofile',
  templateUrl: './businessprofile.page.html',
  styleUrls: ['./businessprofile.page.scss'],
})
export class BusinessprofilePage implements OnInit {

  options1 = {
    initialSlide: 0,
    slidesPerView:3.2,
  };

  options2 = {
    initialSlide: 0,
    slidesPerView:3,
  };
  
  salon_id: any = 1;
  category:any = 'services';
  type : any = 'haircut';
  salon: any;
  safeties: any;
  amenities: any;
  opening_hour: any;

  logoUrl = 'https://hairday.app/assets/images/salon-logos/';
  imageUrl = 'https://hairday.app/assets/images/salons/';
  professionalUrl = 'https://hairday.app/assets/images/professionals/';
  avatarUrl = 'https://hairday.app/assets/images/professional-avatars/';
  defaultUrl = 'assets/imgs/user.png'; 

  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private router: Router,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    var params = this.router.getCurrentNavigation().extras.state;
    if(params) {
      this.salon_id = params.salon_id;
    }
  }

  ionViewWillEnter():void{
    this.getSalonDetail();
  }

  getSalonDetail(){
    this.http.get(this.apiUrl+"salon-detail/"+this.salon_id, this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.salon = [res["data"]["salon"]];
        var salon_image_count = this.salon[0].salon_images.length;
        if(salon_image_count < 4){
          this.salon[0].salon_slider = {
            initialSlide: 0,
            slidesPerView:salon_image_count,
          }
        }else{
          this.salon[0].salon_slider = {
            initialSlide: 0,
            slidesPerView:3.2,
          }
        }
        this.safeties = res["data"]["salon"]["health_and_safeties"];
        this.amenities = res["data"]["salon"]["amenities"];
        let opening_hours = res["data"]["salon"]["opening_hours"];
        let today = new Date;
        let week = today.getDay();
        this.opening_hour = opening_hours[week-1];
        for(var i in this.salon[0].professionals){
          var image_count = this.salon[0].professionals[i].professional_images.length;
          if(image_count < 4){
            this.salon[0].professionals[i].slider_option = {
              initialSlide: 0,
              slidesPerView:image_count,
            }
          }else{
            this.salon[0].professionals[i].slider_option = {
              initialSlide: 0,
              slidesPerView:3.6,
            }
          }
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  async uploadImage(){
    const modal = await this.modalCtrl.create({
      component: ImagemodalPage,
      componentProps: {avatar: null, type: "salon", salon_id: this.salon_id},
      cssClass: 'imagemodal',
      mode:'ios',
      swipeToClose:true,
      presentingElement: await this.modalCtrl.getTop()
    });

    modal.onDidDismiss()
    .then((data:any) => {
      this.getSalonDetail();
    });
    
    return await modal.present();
  }

  editLocation(){
    this.navCtrl.navigateForward('location', {state: {salon_id: this.salon_id}});
  }

  editOpeningHours(){
    this.navCtrl.navigateForward('openinghours', {state: {salon_id: this.salon_id}});
  }

  addDetail(){
    this.navCtrl.navigateForward('about', {state: {salon_id: this.salon_id}});
  }

  addProfessional(){
    this.navCtrl.navigateForward('professionallist', {state: {salon_id: this.salon_id}});
  }

  addServices(){
    this.navCtrl.navigateForward('addservices', {state: {salon_id: this.salon_id}});
  }

  editService(service){
    this.navCtrl.navigateForward('editservice', {state: {service: service}});
  }

  preview(){
    this.navCtrl.navigateForward('salon');
  }

  segmentChanged(category)
  {
    this.category = category;
  }

  dateStringify(dateString){
    var date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: "numeric"});
  }

  toggleAccordion(type): void {
    if(this.type == type){
      this.type = '';
    }else{
      this.type = type;
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
