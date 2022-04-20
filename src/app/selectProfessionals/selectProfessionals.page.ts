import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppointmentmodalPage } from '../appointmentmodal/appointmentmodal.page';
import { stringify } from 'querystring';

@Component({
  selector: 'app-selectProfessionals',
  templateUrl: './selectProfessionals.page.html',
  styleUrls: ['./selectProfessionals.page.scss'],
})
export class SelectProfessionalsPage implements OnInit {
  
  service_ids: any;
  services: any;
  services_checked = [];
  checked: any = [];
  data: any = [];
  salon_id: any;

  avatarUrl = 'https://hairday.app/assets/images/professional-avatars/';
  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private navCtrl: NavController, private router: Router, private modalCtrl: ModalController, private http: HttpClient) { }

  ngOnInit() {
    var params = this.router.getCurrentNavigation().extras.state;
    if(params) {
      this.salon_id = params.salon_id;
      this.service_ids = params.services;
    }

    this.http.post(this.apiUrl+"professionals-by-multi-service", JSON.stringify({service_ids: this.service_ids}), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.services = res["data"]["sending_services"];
      }
    }, (err) => {
      console.log(err);
    });
  }

  check(check, service_id, professional_id){
    if(check){
      if(this.services_checked.indexOf(service_id) == -1){
        this.checked.push(service_id.toString()+professional_id.toString());
        this.services_checked.push(service_id);
        this.data.push({salon_id: this.salon_id, service_id: service_id, professional_id: professional_id})
      }
    }else{
      this.checked.splice(this.services_checked.indexOf(service_id), 1);
      this.data.splice(this.services_checked.indexOf(service_id), 1);
      this.services_checked.splice(this.services_checked.indexOf(service_id), 1);
    }
  }

  async appointment(){
    const modal = await this.modalCtrl.create({
      component: AppointmentmodalPage,
      componentProps: {multi: true, data: this.data},
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

}