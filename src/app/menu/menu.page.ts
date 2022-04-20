import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  name: any;
  salon_id: any = 2;
  defaultUrl = 'assets/imgs/user.png'; 
  avatarUrl = 'assets/imgs/user.png';

  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private navCtrl: NavController, 
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() { 
    var params = this.router.getCurrentNavigation().extras.state;
    if(params) {
      this.salon_id = params.salon_id;
    }
  }

  ionViewWillEnter(): void {
    this.http.get(this.apiUrl+"salon-detail/"+this.salon_id)
    .subscribe(res => {
      if(res["status"] == 200){
        var avatar = res["data"]["salon"]["logo"];
        if(avatar != null){
          this.avatarUrl = 'https://hairday.app/assets/images/salon-logos/'+avatar;
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  directory(){
    this.navCtrl.navigateBack('home');
  }

  businessProfile(){
    this.navCtrl.navigateForward("businessprofile", {state: {salon_id: this.salon_id}});
  }

  clients(){
    this.navCtrl.navigateForward("clients", {state: {salon_id: this.salon_id}});
  }

  calendar(){
    this.navCtrl.navigateForward("calendar", {state: {salon_id: this.salon_id}});
  }

  availability(){
    this.navCtrl.navigateForward('availability', {state: {salon_id: this.salon_id}});
  }

  bank(){
    this.navCtrl.navigateForward('verify', {state: {salon_id: this.salon_id}});
  }

}
