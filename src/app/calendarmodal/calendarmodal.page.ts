import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { format } from "date-fns";


@Component({
  selector: 'app-calendarmodal',
  templateUrl: './calendarmodal.page.html',
  styleUrls: ['./calendarmodal.page.scss'],
})
export class CalendarmodalPage implements OnInit {

  service: any;
  date: any = format(new Date() , 'dd-MM-yyyy');
  eventSource;
  viewTitle;
  day: any;
  time: any;
  
  constructor(private navCtrl: NavController, private modalCtrl: ModalController, private navParams: NavParams) { }
 
  ngOnInit() { 
    this.onCurrentDateChanged(new Date());
   }

  ionViewWillEnter(): void {
    var time = this.navParams.get('time');
    if(time != undefined){
      this.time = time;
    }else{
      this.time = {lower: 8, upper: 24};
    }
  }

  onViewTitleChanged(title)
  {
    this.viewTitle = title;
  }

  onCurrentDateChanged(ev : Date)
  {

    console.log("ev ======>" , ev);
    this.date = new Date(ev);

  };

  setTime(day){
    this.day = day;
    if(day == 'morning'){
      this.time = {lower: 8, upper: 12};
    }else if(day == 'afternoon'){
      this.time = {lower: 12, upper: 18};
    }else{
      this.time = {lower: 18, upper: 24};
    }
  }

  clear(){
    this.modalCtrl.dismiss({date: this.date, time: this.time});
  }

  apply(){
    this.modalCtrl.dismiss({date: this.date, time: this.time});
  }

  close()
  {
    this.modalCtrl.dismiss({date: this.date, time: this.time});
  }
}