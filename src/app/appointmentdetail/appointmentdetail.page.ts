import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-appointmentdetail',
  templateUrl: './appointmentdetail.page.html',
  styleUrls: ['./appointmentdetail.page.scss'],
})
export class AppointmentdetailPage implements OnInit {

  client_name: any;
  professional_name: any;
  service_name: any;
  start_time: any;
  end_time: any;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private http: HttpClient,
    private toastCtrl: ToastController
  ) { }
 
  ngOnInit() {
    var detail = this.navParams.get('detail');
    var client_fname = detail.user.firstname;
    var client_lname = detail.user.lasttname;
    if(client_fname != null && client_lname != null){
      this.client_name = client_fname + " " + client_lname;
    }else if(client_fname != null && client_lname == null){
      this.client_name = client_fname;
    }else if(client_fname == null && client_lname != null){
      this.client_name = client_lname;
    }else{
      this.client_name = detail.user.email;
    }
    this.professional_name = detail.professional.first_name + " " + detail.professional.last_name;
    this.service_name = detail.service.service_name.name;
    this.start_time = detail.booking_time;
    var booking_date = new Date("October 13, 2014 " + this.start_time);
    new Date(booking_date.setMinutes(booking_date.getMinutes() + Number(detail.service.duration)));    
    var hour = booking_date.getHours();
    var min = booking_date.getMinutes();
    var m;
    if(hour > 12){
      hour = hour - 12;
      m = "PM";
    }else{
      m = "AM";
    }
    var newhour;
    if(hour < 10){
      newhour = "0" + hour;
    }else{
      newhour = hour;
    }
    this.end_time = newhour + ":" + min + " " + m;
  }

  close()
  {
    this.modalCtrl.dismiss({avatar: null});
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
