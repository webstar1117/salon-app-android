import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  name: any;
  newBusiness: boolean;
  avatarUrl = 'assets/imgs/user.png';
  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private navCtrl: NavController, private http: HttpClient, private googlePlus: GooglePlus, private fb: Facebook) { }

  ngOnInit() {  }

  ionViewWillEnter(): void {
    this.http.post(this.apiUrl+"profile", JSON.stringify({api_token: localStorage.getItem('token')}), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        var fname = res["data"]["user"]["firstname"];
        var lname = res["data"]["user"]["lastname"];
        console.log(res["data"]);
        if(fname != null && lname != null){
          this.name = fname + " " + lname;
        }else if(fname != null && lname == null){
          this.name = fname;
        }else if(fname == null && lname != null){
          this.name = lname;
        }else{
          this.name = res["data"]["user"]["email"];
        }
        
        var avatar = res["data"]["user"]["avatar"];
        if(avatar != null){
          this.avatarUrl = 'https://hairday.app/assets/images/avatars/'+avatar;
        }

        var salons = res["data"]["salons"];
        if(salons != null){
          this.newBusiness = false;
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  close(){
    this.navCtrl.navigateBack('home');
  }

  editProfile(){
    this.navCtrl.navigateForward("profilesetting");
  }

  notifications(){
    this.navCtrl.navigateForward("notifications");
  }

  cards(){
    this.navCtrl.navigateForward("cards");
  }

  myAppointments(){
    this.navCtrl.navigateForward('myappointments');
  }

  favorite(){
    this.navCtrl.navigateForward('favorite');
  }

  business(){
    if(this.newBusiness){
      this.navCtrl.navigateForward('business');
    }else{
      this.navCtrl.navigateForward('mybusiness')
    }
  }

  signout()
  {
    if(localStorage.getItem('location') != null){
      localStorage.removeItem('location');
    }else if(sessionStorage.getItem('location') != null){
      sessionStorage.removeItem('location');
    }
    if(localStorage.getItem("social") != null){
      if(localStorage.getItem("social") == "google"){
        this.googlePlus.logout()
        .then(res => {
          // user logged out so we will remove him from the NativeStorage
          localStorage.removeItem("social");
          this.navCtrl.navigateRoot('login');
        }, err =>{
          console.log(err);
        })
      }else if(localStorage.getItem("social") == "facebook"){
        this.fb.logout()
        .then(res => {
          localStorage.removeItem("social");
          this.navCtrl.navigateRoot('login');
        }, err =>{
          console.log(err);
        })
      }
    }else{
      localStorage.removeItem("token");
      this.navCtrl.navigateRoot('login');
    }
  }

}
