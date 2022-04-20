import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addprofessional',
  templateUrl: './addprofessional.page.html',
  styleUrls: ['./addprofessional.page.scss'],
})
export class AddprofessionalPage implements OnInit {
  
  fname: string;
  lname: string;
  skill: any;
  professional: string;
  avatar: any;
  avatarUrl: any = 'assets/imgs/user.png';
  options = {
    initialSlide: 0,
    slidesPerView:2,
  };
  category:any = 'portfolio';
  portfolios: any = [];
  portfolio_urls: any = [];
  services: any;
  salon_id: any = 2;
  open: any = [];
  checked: any = [];
  
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
      this.skill = params.skill;
      this.professional = this.skill.name;
      this.salon_id = params.salon_id;
    }
    this.http.get(this.apiUrl+"business/get-services?salon_id="+this.salon_id)
    .subscribe(res => {
      if(res["status"] == 200){
        this.services = res["data"][0];
      }
    }, (err) => {
      console.log(err);
    });
  }

  preview(){
    this.navCtrl.navigateForward('portfolio')
  }

  segmentChanged(category)
  {
    this.category = category;
  }

  openAccordian(service){
    if(this.open.indexOf(service) !== -1)  
    {  
      this.open.splice(this.open.indexOf(service), 1);
    }   
    else  
    {  
      this.open.push(service);
    }
  }

  check(check, service_id){
    if(check){
      this.checked.push(service_id);
    }else{
      this.checked.splice(this.checked.indexOf(service_id), 1);
    }
  }

  saveProfessional(){
    if(this.fname == undefined){
      this.toastMessage('Please input first name');
    }else if(this.lname == undefined){
      this.toastMessage('Please input last name');
    }else if(this.checked.length == 0){
      this.toastMessage('Please select services');
    }else if(this.avatar == undefined){
      this.toastMessage('Please upload profile image');
    }else if(this.portfolios.length == 0){
      this.toastMessage('Please upload portfolios');
    }else{
      let formData = new FormData();
      formData.append("first_name", this.fname);
      formData.append("last_name", this.lname);
      formData.append("salon_id", this.salon_id);
      formData.append("professional_skill_id", this.skill.id);
      formData.append("service_ids", JSON.stringify(this.checked));
      formData.append("avatar", this.avatar);
      for(var i in this.portfolios){
        formData.append("images[]", this.portfolios[i]);
      }  
      this.http.post(this.apiUrl+"business/add-professional", formData)
        .subscribe(res => {
          if(res["status"] == 200){
            this.toastMessage(res["message"]);
            this.navCtrl.navigateBack('businessprofile');
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

  async changeImage(){
    const modal = await this.modalCtrl.create({
      component: ImagemodalPage,
      componentProps: {avatar: null, type: "professional"},
      cssClass: 'imagemodal',
      mode:'ios',
      swipeToClose:true,
      presentingElement: await this.modalCtrl.getTop()
    });

    modal.onDidDismiss()
    .then((data:any) => {
      this.avatar = data.data.avatar;
      if(this.avatar != null){
        this.readFile(this.avatar, 'avatar');
      }
    });
    
    return await modal.present();
  }

  async uploadPortfolio(){
    const modal = await this.modalCtrl.create({
      component: ImagemodalPage,
      componentProps: {avatar: null, type: "portfolio"},
      cssClass: 'imagemodal',
      mode:'ios',
      swipeToClose:true,
      presentingElement: await this.modalCtrl.getTop()
    });

    modal.onDidDismiss()
    .then((data:any) => {
      var portfolio = data.data.avatar;
      if(portfolio != null){
        this.portfolios.push(portfolio);
        this.readFile(portfolio, 'portfolio');
      }
    });
    
    return await modal.present();
  }

  readFile(file, type){
    let reader = new FileReader();
    let point = this;
    if(type == 'avatar'){
      reader.onload = (_event) => { 
        point.avatarUrl = reader.result;
      }
    }else{
      reader.onload = (_event) => { 
        var image = reader.result;
        point.portfolio_urls.push(image);
      }
    }
    reader.readAsDataURL(file);
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
