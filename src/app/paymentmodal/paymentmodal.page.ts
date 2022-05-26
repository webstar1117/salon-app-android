import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-paymentmodal',
  templateUrl: './paymentmodal.page.html',
  styleUrls: ['./paymentmodal.page.scss'],
})
export class PaymentmodalPage implements OnInit {

  datas: any;
  avatarUrl = 'https://hairday.app/assets/images/professional-avatars/';

  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private navCtrl: NavController, 
    private modalCtrl: ModalController, 
    private navParams: NavParams, 
    private toastCtrl: ToastController,
  ) { }
 
  ngOnInit() {
    this.datas = this.navParams.get('datas');
    console.log(this.datas);
  }

  close()
  {
    this.modalCtrl.dismiss();
  }

  goHome()
  {
    this.navCtrl.navigateRoot('home');
    this.modalCtrl.dismiss();
  }

  async toastMessage(msg){
    const toast = await this.toastCtrl.create({
      message: msg,
      cssClass: 'ion-text-center',
      duration: 2000
    });
    toast.present();
  }
}
