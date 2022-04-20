import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-paysuccess',
  templateUrl: './paysuccess.page.html',
  styleUrls: ['./paysuccess.page.scss'],
})
export class PaysuccessPage implements OnInit {
  bitcoinhandler:any = 'animate__animated animate__bounceInDown animate__slow';
  constructor(private modalCtrl: ModalController,private navCtrl: NavController) { }

  ngOnInit() {

    this.setanimation();
  }
  

  setanimation()
  {
    let timeout =setTimeout(() => {
      this.bitcoinhandler = "animate__animated animate__flip ";
      clearTimeout(timeout);
      this.setanimation2()
    }, 3000);

   
  }


  setanimation2()
  {
    setTimeout(() => {
      this.bitcoinhandler = "floatanimation1";
    }, 2000);
  }

  close()
  {
    this.modalCtrl.dismiss().then(()=>{
      this.navCtrl.navigateRoot('tabs/tab1');
    })
  }


}
