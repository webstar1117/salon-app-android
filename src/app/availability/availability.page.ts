import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.page.html',
  styleUrls: ['./availability.page.scss'],
})
export class AvailabilityPage implements OnInit {

  salon_id: any=2;
  professionals: any;
  empty: boolean = true;

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
    this.http.get(this.apiUrl+"business/get-professionals?salon_id="+this.salon_id)
    .subscribe(res => {
      if(res["status"] == 200){
        this.professionals = res["data"][0];
        if(this.professionals.length > 0){
          this.empty = false;
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  addProfessional(){
    this.navCtrl.navigateForward('professionallist');
  }

  setupAvailability(id){
    this.navCtrl.navigateForward('availabilities', {state: {salon_id: this.salon_id, professional_id: id}});
  }
}
