import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
import { SearchmodalPage } from '../searchmodal/searchmodal.page';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.page.html',
  styleUrls: ['./convert.page.scss'],
})
export class ConvertPage implements OnInit {
fromCurrency:any;
toCurrency:any;
currencies:any;
showAnimation:any = 'rotateanimation'
converted:boolean = false;
backdrop:any = ''
  constructor(private modalController: ModalController, private navParams: NavParams ) { }

  ngOnInit() {
      this.fromCurrency = 'bitcoin';
      this.toCurrency = 'eth';

      this.showAnimation = 'rotateanimation';
      this.currencies = [
        {
          "id": 1,
          "name": "BTC",
          icon: "assets/imgs/btcbtn.svg",
          value:"bitcoin",
          status:'bitcoin'
        },
      
        {
          "id": 2,
          "name": "Ethereum",
          icon: "assets/imgs/ethbtn.svg",
          value:"eth"
        },
      
        {
          "id": 3,
          "name": "Tether",
          icon: "assets/imgs/tetherbtn.svg",
          value:"tether"
        },
        {
          "id": 4,
          "name": "USD",
          icon: "assets/imgs/usdtbtn.svg",
          value:"usd"
        },
      
        {
          "id": 5,
          "name": "Ave",
          icon: "assets/imgs/avebtn.svg",
          value:"ave"
        }
      ]
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchmodalPage,
      cssClass: 'my-custom-class',
      mode:'ios',
      swipeToClose:true,
      presentingElement: await this.modalController.getTop()
    });

    modal.onDidDismiss()
    .then((data:any) => {
      console.log(data.data.fromcurrency);
      this.fromCurrency = data.data.fromcurrency;
      this.toCurrency = data.data.tocurrency;
  });
    
    return await modal.present();
  }

  convert()
  {

    this.showAnimation = 'rotateanimationinfinite'

    setTimeout(() => {
      this.showAnimation = 'rotateanimation'
      this.showSuccess();
    }, 3000);

  }

  showSuccess()
  {
    this.converted = true;
  }

  goBack()
  {
      this.backdrop = 'animate__animated animate__slow animate__fadeOutUpBig';
      setTimeout(() => {
          this.backdrop = '';
          this.converted = false;
          this.showAnimation = ''
      }, 500);
  }
}
