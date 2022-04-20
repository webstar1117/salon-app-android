import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddcardmodalPage } from '../addcardmodal/addcardmodal.page';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {

  options2 = {
    initialSlide: 0,
    slidesPerView:1,
  };
  cards: any;
  method: string = 'apple';
  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private navCtrl: NavController, private modalCtrl: ModalController, private http: HttpClient) { }

  ngOnInit() {
    this.getCards();
  }

  getCards(){
    this.http.post(this.apiUrl+"card", JSON.stringify({api_token: localStorage.getItem('token')}), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.cards = res["data"];
        for(var i in this.cards){
          if(this.cards[i].default == 1){
            this.method = String(this.cards[i].id);
          }
        }
      }
    }, (err) => {
      console.log(err);
    });
  }
  
  async addCard(){
    const modal = await this.modalCtrl.create({
      component: AddcardmodalPage,
      cssClass: 'imagemodal',
      mode:'ios',
      swipeToClose:true,
      presentingElement: await this.modalCtrl.getTop()
    });

    modal.onDidDismiss()
    .then((data:any) => {
      this.getCards();
    });
    
    return await modal.present();
  }

  selectCard(){
    var params = {
      card_id: this.method,
      default: 1,
    };
    this.http.post(this.apiUrl+"card/default", JSON.stringify(params), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
      }
    }, (err) => {
      console.log(err);
    });
  }

  deleteCard(card_id){
    console.log(card_id);
    this.http.post(this.apiUrl+"card/delete", JSON.stringify({card_id: card_id}), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.getCards();
      }
    }, (err) => {
      console.log(err);
    });
  }

}
