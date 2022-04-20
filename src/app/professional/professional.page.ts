import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.page.html',
  styleUrls: ['./professional.page.scss'],
})
export class ProfessionalPage implements OnInit {

  title: any;
  service_id:any = 1;
  professionals: any;
  salon_id: any;
  professionalUrl = 'https://hairday.app/assets/images/professionals/';
  avatarUrl = 'https://hairday.app/assets/images/professional-avatars/';
  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private navCtrl: NavController, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    var params = this.router.getCurrentNavigation().extras.state;
    if(params) {
      this.salon_id = params.salon_id;
      this.service_id = params.service_id
    }

    this.http.get(this.apiUrl+"professionals-by-service/"+this.service_id, this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.title = res["data"]["name"];
        this.professionals = res["data"]["professionals"];
        for(var i in this.professionals){
          var image_count = this.professionals[i].professional_images.length;
          if(image_count < 4){
            this.professionals[i].options = {
              initialSlide: 0,
              slidesPerView:image_count,
            };
          }else{
            this.professionals[i].options = {
              initialSlide: 0,
              slidesPerView:3.6,
            };
          }
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  goPortfolio(professional_id){
    this.navCtrl.navigateForward('portfolio',{state: {salon_id: this.salon_id, service_id: this.service_id, professional_id: professional_id}});
  }

}

