import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  
  services: any;
  salon_id: any;
  open: any = [];
  checked: any = [];
  type_checked: any = [];
  data: any = [];
  constructor(private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
    var params = this.router.getCurrentNavigation().extras.state;
    if(params) {
      this.salon_id = params.salon_id;
      this.services = params.services;
    }
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

  check(check, type_id, service_id){
    if(check){
      if(this.type_checked.indexOf(type_id) == -1){
        this.checked.push(type_id.toString()+service_id.toString());
        this.type_checked.push(type_id);
        this.data.push(service_id);
      }
    }else{
      this.checked.splice(this.type_checked.indexOf(type_id), 1);
      this.data.splice(this.type_checked.indexOf(type_id), 1);
      this.type_checked.splice(this.type_checked.indexOf(type_id), 1);
    }
  }

  selectProfessionals(){
    this.navCtrl.navigateForward('selectProfessionals', {state: {salon_id: this.salon_id, services: this.data}});
  }

}
