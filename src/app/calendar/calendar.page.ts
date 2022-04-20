import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppointmentdetailPage } from '../appointmentdetail/appointmentdetail.page';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  salon_id: any=1;
  date: any = new Date();
  eventSource;
  viewTitle;
  calendar = {
      mode: 'week' as CalendarMode,
      step: 1 as Step,
      startingDayMonth: 1,
      currentDate: new Date(),
      dateFormatter: {
          formatMonthViewDayHeader: function(date:Date) {
            var week = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
            return week[date.getDay()];
          }
      }
  };

  apiUrl = 'https://hairday.app/api/';
  
  constructor(
    private navCtrl: NavController, 
    private modalCtrl: ModalController, 
    private http: HttpClient,
    private router: Router) { }
 
  ngOnInit() {
    var params = this.router.getCurrentNavigation().extras.state;
    if(params){
      this.salon_id = params.salon_id;
    }
    this.http.get(this.apiUrl+"business/get-appointments?salon_id="+this.salon_id)
    .subscribe(res => {
      if(res["status"] == 200){
        console.log(res["data"]);
        var appointments = res["data"][0];
        this.createEvents(appointments);
      }
    }, (err) => {
      console.log(err);
    });
  }

  previous()
  {
    this.calendar.currentDate = new Date(this.calendar.currentDate.setDate(this.calendar.currentDate.getDate() - 7));
  }

  next()
  {
    this.calendar.currentDate = new Date(this.calendar.currentDate.setDate(this.calendar.currentDate.getDate() + 7));
  }

  onViewTitleChanged(title)
  {
    this.viewTitle = title;
  }

  onCurrentDateChanged(ev: Date)
  {
    this.date = ev;
  };

  createEvents(appointments) {
    var events = [];
    for (var i in appointments) {
        var start_date_string = appointments[i].booking_month + " " + appointments[i].booking_date + ", " + appointments[i].booking_year + " " + appointments[i].booking_time;
        var startTime = new Date(start_date_string);
        var end_date_string = appointments[i].booking_month + " " + appointments[i].booking_date + ", " + appointments[i].booking_year + " " + appointments[i].booking_time;
        var endTime = new Date(end_date_string);
        new Date(endTime.setMinutes(endTime.getMinutes() + Number(appointments[i].service.duration)));;
        events.push({
            title: 'Appointment',
            detail: appointments[i],
            startTime: startTime,
            endTime: endTime,
            allDay: false
        });
    }
    this.eventSource = events;
  }

  async onEventSelected(event) {
    const modal = await this.modalCtrl.create({
      component: AppointmentdetailPage,
      componentProps: {detail: event.detail},
      cssClass: 'imagemodal',
      mode:'ios',
      swipeToClose:true,
      presentingElement: await this.modalCtrl.getTop()
    });
    
    return await modal.present();
  }

}
