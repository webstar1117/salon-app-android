import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServicemodalPage } from '../servicemodal/servicemodal.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addservices',
  templateUrl: './addservices.page.html',
  styleUrls: ['./addservices.page.scss'],
})
export class AddservicesPage implements OnInit {

  service: any;
  services = [];
  service_type: any;
  service_types = [];
  service_empty = true;
  checked = [];
  salon_id: any = 12;

  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private router: Router,
    private http: HttpClient) { }
 
  ngOnInit() { 
    var params = this.router.getCurrentNavigation().extras.state;
    if(params){
      this.salon_id = params.salon_id;
    }

    this.http.get(this.apiUrl+"business/get-services?salon_id="+this.salon_id)
    .subscribe(res => {
      if(res["status"] == 200){
        var services = res["data"][0];
        for(var i in services){
          for(var j in services[i]["data"]){
            this.checked.push(services[i]["data"][j].service_name_id);
          }
        }
      }
    }, (err) => {
      console.log(err);
    });

    this.http.get(this.apiUrl+"business/get-all-services")
    .subscribe(res => {
      if(res["status"] == 200){
        this.service_types = res["data"][0];
      }
    }, (err) => {
      console.log(err);
    });
  }

  selectServiceType(index){
    this.services = this.service_types[index]["data"];
    console.log(this.services);
    this.service_empty = false;
  }

  async check(service){
    const modal = await this.modalCtrl.create({
      component: ServicemodalPage,
      componentProps: {salon_id: this.salon_id, service: service},
      cssClass: 'imagemodal',
      mode:'ios',
      swipeToClose:true,
      presentingElement: await this.modalCtrl.getTop()
    });

    modal.onDidDismiss()
    .then((data:any) => {
      if(data.data.service != ""){
        this.checked.push(data.data.service);
      }
    });
    
    return await modal.present();
  }
}
