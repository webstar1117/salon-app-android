import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-availabilities',
  templateUrl: './availabilities.page.html',
  styleUrls: ['./availabilities.page.scss'],
})
export class AvailabilitiesPage implements OnInit {

  salon_id: any =1;
  professional_id: any =1;
  professional_name: any;
  availabilities = [];
  opening_hours: any;
  
  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private router: Router,
    private http: HttpClient) { }
 
  ngOnInit() { 
    var params = this.router.getCurrentNavigation().extras.state;
    if(params){
      this.salon_id = params.salon_id;
      this.professional_id = params.professional_id;
    }
    this.http.get(this.apiUrl+"business/get-professional-availability?salon_id="+this.salon_id+"&professional_id="+this.professional_id)
    .subscribe(res => {
      if(res["status"] == 200){
        this.professional_name = res["data"]["professionals"][0].first_name + " " + res["data"]["professionals"][0].last_name;
        this.opening_hours = res["data"]["opening_hours"];
        for(var day in this.opening_hours){
          if(day in res["data"]["professionals"][0].professional_availabilities){
            var data1 = {
              day: day,
              start_time: res["data"]["professionals"][0].professional_availabilities[day].start_time,
              end_time: res["data"]["professionals"][0].professional_availabilities[day].end_time,
              break_start_time: res["data"]["professionals"][0].professional_availabilities[day].break_start_time,
              break_end_time: res["data"]["professionals"][0].professional_availabilities[day].break_end_time,
              status: res["data"]["professionals"][0].professional_availabilities[day].status == 1? true : false,
              time_select: this.opening_hours[day]
            }
            this.availabilities.push(data1);
          }else{
            var data2 = {
              day: day,
              start_time: this.opening_hours[day][0],
              end_time: this.opening_hours[day][this.opening_hours[day].length - 1],
              break_start_time: null,
              break_end_time: null,
              status: false,
              time_select: this.opening_hours[day]
            }
            this.availabilities.push(data2);
          }
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  setStartTime(id, ev){
    this.availabilities[id].start_time = ev.target.value;
  }

  setEndTime(id, ev){
    this.availabilities[id].end_time = ev.target.value;
  }

  setBreakStartTime(id, ev){
    this.availabilities[id].break_start_time = ev.target.value;
  }

  setBreakTime(id, ev){
    this.availabilities[id].break_end_time = ev.target.value;
  }

  addBreack(id){
    this.availabilities[id].break_start_time = this.availabilities[id].start_time;
    this.availabilities[id].break_end_time = this.availabilities[id].end_time;
  }

  removeBreack(id){
    this.availabilities[id].break_start_time = null;
    this.availabilities[id].break_end_time = null;
  }

  saveProfile(){
    var data = {
      professional_id: this.professional_id,
      availabilities: this.availabilities
    }
    this.http.post(this.apiUrl+"business/add-professional-availability", JSON.stringify(data), this.httpOptions)
    .subscribe(res => {
      if(res["status"] == 200){
        this.toastMessage(res["message"]);
        this.navCtrl.navigateBack('availability', {state: {salon_id: this.salon_id}});
      }else{
        for(let key in res["message"]){
          this.toastMessage(res["message"][key]);
        }
      }
    }, (err) => {
      console.log(err);
    });
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
