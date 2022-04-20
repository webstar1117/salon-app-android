import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, ModalController, AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppointmentmodalPage } from '../appointmentmodal/appointmentmodal.page';

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.page.html',
  styleUrls: ['./myappointments.page.scss'],
})
export class MyappointmentsPage implements OnInit {
    
  options = {
    initialSlide: 0,
    slidesPerView:2,
  };
  category:any = 'upcoming';
  upcoming: any;
  archieve: any;
  logoUrl = 'https://hairday.app/assets/images/salon-logos/';

  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  
  constructor(
    private navCtrl: NavController, 
    private http: HttpClient,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.getUpcoming();
    this.getArchieve();    
  }

  getUpcoming(){
    var token = localStorage.getItem("token");
    this.http.get(this.apiUrl+"my-appointment/get-upcoming?api_token="+token)
    .subscribe(res => {
      if(res["status"] == 200){
        this.upcoming = res["data"];
        console.log(this.upcoming);
        for(var i in this.upcoming){
          var start_time = this.upcoming[i].booking_time;
          var booking_date = new Date("October 13, 2014 " + start_time);
          new Date(booking_date.setMinutes(booking_date.getMinutes() + Number(this.upcoming[i].service.duration)));    
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
          this.upcoming[i].end_time = newhour + ":" + min + " " + m;
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  getArchieve(){
    var token = localStorage.getItem("token");
    this.http.get(this.apiUrl+"my-appointment/get-archive?api_token="+token)
    .subscribe(res => {
      if(res["status"] == 200){
        this.archieve = res["data"];
        console.log(this.archieve);
        for(var i in this.archieve){
          var start_time = this.archieve[i].booking_time;
          var booking_date = new Date("October 13, 2014 " + start_time);
          new Date(booking_date.setMinutes(booking_date.getMinutes() + Number(this.archieve[i].service.duration)));    
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
          this.archieve[i].end_time = newhour + ":" + min + " " + m;
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  segmentChanged(category)
  {
    this.category = category;
  }

  async repeatAppointment(appointment){
    var professional_id = appointment.professional_id;
    var service_id = appointment.service_id;
    var salon_id = appointment.salon_id;
    const modal = await this.modalCtrl.create({
      component: AppointmentmodalPage,
      componentProps: {multi: false, professional_id: professional_id, service_id: service_id, salon_id: salon_id},
      cssClass: 'appointmodal',
      mode:'ios',
      swipeToClose:true,
      presentingElement: await this.modalCtrl.getTop()
    });

    modal.onDidDismiss()
    .then((data:any) => {
    });
    
    return await modal.present();
  }

  changeAppointment(appointment){
    this.http.post(this.apiUrl+"my-appointment/cancel-appointment", JSON.stringify({appointment_id: appointment.id}), this.httpOptions)
      .subscribe(res => {
        if(res["status"] == 200){
          this.getUpcoming();
        }
      }, (err) => {
        console.log(err);
      });
    this.repeatAppointment(appointment);
  }

  async cancelAppointment(appointment_id){
    const alert = await this.alertCtrl.create({
      cssClass: 'confirm-alert',
      header: 'Confirmation',
      message: 'Do you really want to cancel the appointment?',
      mode: 'ios',
      buttons: [
        {
          text: 'Yes',
          cssClass: 'confirm-button',
          handler: () => {
            this.http.post(this.apiUrl+"my-appointment/cancel-appointment", JSON.stringify({appointment_id: appointment_id}), this.httpOptions)
            .subscribe(res => {
              if(res["status"] == 200){
                this.toastMessage(res["message"]);
                this.getUpcoming();
              }else{
                if(Array.isArray(res["message"])){
                  for(let key in res["message"]){
                    this.toastMessage(res["message"][key]);
                  }
                }else{
                  this.toastMessage(res["message"]);
                }
              }
            }, (err) => {
              console.log(err);
            });
          }
        }, {
          text: 'No',
          cssClass: 'cancel-button',
          handler: () => {}
        } 
      ]
    });

    await alert.present();
    
  }

  leaveReview(appointment){
    var professional_id = appointment.professional_id;
    var service_id = appointment.service_id;
    var salon_id = appointment.salon_id;
    this.navCtrl.navigateForward('review', {state: {salon_id: salon_id, service_id: service_id, professional_id: professional_id}});
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
