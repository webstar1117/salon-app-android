import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professionallist',
  templateUrl: './professionallist.page.html',
  styleUrls: ['./professionallist.page.scss'],
})
export class ProfessionallistPage implements OnInit {

  skills: any;
  salon_id: any;

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
    this.http.get(this.apiUrl+"business/get-professional-skills")
    .subscribe(res => {
      if(res["status"] == 200){
        this.skills = res["data"][0];
      }
    }, (err) => {
      console.log(err);
    });
  }

  addProfessional(index){
    var skill = this.skills[index];
    this.navCtrl.navigateForward('addprofessional', {state: {skill: skill, salon_id: this.salon_id}});
  }
}
