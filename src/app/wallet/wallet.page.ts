import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  category:any = 'history';
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  segmentChanged(ev)
  {
    this.category = ev.detail.value;
  }

  goBuy()
  {
    this.navCtrl.navigateForward('buy');
  }
}
