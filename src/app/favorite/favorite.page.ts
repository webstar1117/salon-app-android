import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
    
  options0 = {
    initialSlide: 0,
    slidesPerView:2,
  };

  options = {
    initialSlide: 0,
    slidesPerView:3.6,
  };

  category:any = 'salons';
  salons: any;
  professionals: any;
  salonUrl = 'https://hairday.app/assets/images/salons/';
  logoUrl = 'https://hairday.app/assets/images/salon-logos/';
  avatarUrl = 'https://hairday.app/assets/images/professional-avatars/';
  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private navCtrl: NavController, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.http.post(this.apiUrl+"salon/favorite/read", JSON.stringify({api_token: localStorage.getItem('token')}), this.httpOptions)
    .subscribe(res => {
      console.log(res);
      if(res["status"] == 200){
        this.salons = res["data"];
      }
    }, (err) => {
      console.log(err);
    });

    this.http.post(this.apiUrl+"professional/favorite/read", JSON.stringify({api_token: localStorage.getItem('token')}), this.httpOptions)
    .subscribe(res => {
      console.log(res);
      if(res["status"] == 200){
        this.professionals = res["data"];
      }
    }, (err) => {
      console.log(err);
    });

  }

  segmentChanged(category)
  {
    this.category = category;
  }

  appointment(){
    console.log('Book appointment');
  }
}
