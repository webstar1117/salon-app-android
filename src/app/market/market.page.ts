import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {
category:any = 'watchlist';
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  segmentChanged(ev)
  {
    this.category = ev.detail.value;
  }


  goDetailedView()
  {
    this.navCtrl.navigateForward('detailed');
  }

}
