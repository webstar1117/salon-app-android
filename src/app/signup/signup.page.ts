import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  ptype:any= 'password';
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  switchType()
  {
    if(this.ptype == 'password')
    {
      this.ptype = 'text';
    }

    else
    {
      this.ptype = 'password'
    }
  }

  goLogin()
  {
    this.navCtrl.navigateRoot('login');
  }

  goOTP()
  {
    this.navCtrl.navigateForward('otpphoneinput');
  }

}
