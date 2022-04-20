import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.page.html',
  styleUrls: ['./buy.page.scss'],
})
export class BuyPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }


  goPaybyCard()
  {
    this.navCtrl.navigateForward('paybycard');
  }
}
