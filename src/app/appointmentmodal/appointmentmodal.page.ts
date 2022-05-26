import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams, ToastController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';
import { PaymentmodalPage } from '../paymentmodal/paymentmodal.page';

@Component({
  selector: 'app-appointmentmodal',
  templateUrl: './appointmentmodal.page.html',
  styleUrls: ['./appointmentmodal.page.scss'],
})
export class AppointmentmodalPage implements OnInit {

  title: string = 'Appointment';
  multi: any;
  professional_id: any;
  service_id: any;
  salon_id: any;
  appointment_id: any;
  multidata: any;
  datas: any;
  date: any = new Date();
  time: any;
  time_done: any;
  tip: any = "none";
  isSetTime: boolean = false;
  payable: boolean = false;
  total_price: number = 0;
  orginal_price: number = 0;
  tip_price: number = 0;
  options1 = {
    initialSlide: 0,
    slidesPerView:3.6,
  };
  calendar = {
      mode: 'month' as CalendarMode,
      step: 30 as Step,
      startingDayMonth: 1,
      dateFormatter: {
          formatMonthViewDayHeader: function(date:Date) {
            var week = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
            return week[date.getDay()];
          }
      }
  };

  avatarUrl = 'https://hairday.app/assets/images/professional-avatars/';
  professionalUrl = 'https://hairday.app/assets/images/professionals/';
  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private navCtrl: NavController, 
    private modalCtrl: ModalController, 
    private navParams: NavParams, 
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    private stripe: Stripe,
  ) { 
    let _this = this;
    setTimeout(() => {
      // Render the PayPal button into #paypal-button-container
      <any>window['paypal'].Buttons({

        // Set up the transaction
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: _this.total_price
              }
            }]
          });
        },

        // Finalize the transaction
        onApprove: function (data, actions) {
          return actions.order.capture()
            .then(function (details) {
              // Show a success message to the buyer
              if(_this.multi == false){
                var data = {
                  api_token: localStorage.getItem('token'),
                  professional_id: _this.professional_id,
                  service_id: _this.service_id,
                  salon_id: _this.salon_id,
                  year: _this.date.toLocaleDateString("en-US", { year: 'numeric'}),
                  month: _this.date.toLocaleDateString("en-US", { month: 'long' }),
                  date: _this.date.toLocaleDateString("en-US", { day: 'numeric' }),
                  day: _this.date.toLocaleDateString("en-US", { weekday: 'long' }),
                  time: _this.datas[0].time,
                  price: _this.orginal_price,
                  tip: _this.tip_price,
                  tax: 0
                }
                _this.http.post(_this.apiUrl+"appointment/add", JSON.stringify(data), _this.httpOptions)
                .subscribe(res => {
                  if(res["status"] == 200){
                    _this.paymentSuccess();
                    _this.modalCtrl.dismiss();
                  }else{
                    _this.toastMessage("Failed to add data");
                  }
                }, (err) => {
                  console.log(err);
                });
              }else{
                let multidata = []; 
                for(var i in _this.datas){
                  let data = {
                    professional_id: _this.datas[i]["professional"]["id"],
                    service_id: _this.datas[i]["service"]["id"],
                    salon_id: _this.datas[i]["service"]["salon_id"],
                    year: _this.datas[i]["date"].toLocaleDateString("en-US", { year: 'numeric'}),
                    month: _this.datas[i]["date"].toLocaleDateString("en-US", { month: 'long' }),
                    date: _this.datas[i]["date"].toLocaleDateString("en-US", { day: 'numeric' }),
                    day: _this.datas[i]["date"].toLocaleDateString("en-US", { weekday: 'long' }),
                    time: _this.datas[i].time,
                    price: _this.datas[i]["service"]["price"],
                    tip: _this.tip_price,
                    tax: 0
                  }
                  multidata.push(data);
                }
                let requestData = {
                  api_token: localStorage.getItem('token'),
                  data: multidata
                }
                _this.http.post(_this.apiUrl+"appointment/add-multi", JSON.stringify(requestData), _this.httpOptions)
                .subscribe(res => {
                  if(res["status"] == 200){
                    _this.paymentSuccess();
                    _this.modalCtrl.dismiss();
                  }else{
                    _this.toastMessage("Failed to add data");
                  }
                }, (err) => {
                  console.log(err);
                });
              }
            })
            .catch(err => {
              console.log(err);
            })
        }
      }).render('#paypal-button-container');
    }, 500)
  }
 
  ngOnInit() {
    this.multi = this.navParams.get('multi');
    if(this.multi == false){
      this.professional_id = this.navParams.get('professional_id');
      this.service_id = this.navParams.get('service_id');
      this.salon_id = this.navParams.get('salon_id');
      this.appointment_id = this.navParams.get('appointment_id');
      this.getOneData();
    }else{
      this.multidata = this.navParams.get('data');
      this.getMultiData();
    }
  }

  getOneData(){
    var params = {
      salon_id: this.salon_id,
      service_id: this.service_id,
      professional_id: this.professional_id,
      year: this.date.toLocaleDateString("en-US", { year: 'numeric'}),
      month: this.date.toLocaleDateString("en-US", { month: 'long' }),
      date: this.date.toLocaleDateString("en-US", { day: 'numeric' }),
      day: this.date.toLocaleDateString("en-US", { weekday: 'long' })
    }
    this.http.post(this.apiUrl+"appointment/book-one", JSON.stringify(params), this.httpOptions)
    .subscribe(res => {
      console.log(res);
      if(res["status"] == 200){
        this.datas = [res["data"]];
        this.datas[0]["date"] = new Date();
        this.datas[0]["dateString"] = this.datas[0]["date"].toLocaleDateString("en-US", { weekday: 'long', day: 'numeric', month: 'short' })
        this.datas[0]["viewTitle"] = "";
        this.datas[0]["time"] = "";
        this.datas[0]["time_done"] = "";
        this.datas[0]["editable"] = false;
        this.total_price = res["data"]["service"]["price"];
        this.orginal_price = this.total_price;
      }
    }, (err) => {
      console.log(err);
    });
  }

  getMultiData(){
    for(var x in this.multidata){
      this.multidata[x].year = this.date.toLocaleDateString("en-US", { year: 'numeric' }),
      this.multidata[x].month = this.date.toLocaleDateString("en-US", { month: 'long' }),
      this.multidata[x].date = this.date.toLocaleDateString("en-US", { day: 'numeric' }),
      this.multidata[x].day = this.date.toLocaleDateString("en-US", { weekday: 'long' })
    }
    this.http.post(this.apiUrl+"appointment/book-multi", JSON.stringify({data: this.multidata}), this.httpOptions)
    .subscribe(res => {
      console.log(res);
      if(res["status"] == 200){
        this.datas = res["data"];
        for(var i in this.datas){
          this.datas[i]["date"] = new Date();
          this.datas[i]["dateString"] = this.datas[i]["date"].toLocaleDateString("en-US", { weekday: 'long', day: 'numeric', month: 'short' })
          this.datas[i]["viewTitle"] = "";
          this.datas[i]["time"] = "";
          this.datas[i]["time_done"] = "";
          this.datas[i]["editable"] = false;
          if(this.datas[i]["service"]["price"] != null){
            this.total_price += this.datas[i]["service"]["price"];
          }
        }
        this.orginal_price = this.total_price;
      }
    }, (err) => {
      console.log(err);
    });
  }

  editDate(key){
    this.datas[key].editable = true;
  }

  previous(key)
  {
    this.datas[key].date = new Date(this.datas[key].date.setMonth(this.datas[key].date.getMonth() - 1));
  }

  next(key)
  {
    this.datas[key].date = new Date(this.datas[key].date.setMonth(this.datas[key].date.getMonth() + 1));
  }

  onViewTitleChanged(title, key)
  {
    this.datas[key].viewTitle = title;
  }

  onCurrentDateChanged(ev: Date, key)
  {
    this.datas[key].date = ev;
    this.date = ev;
    this.datas[key].dateString = this.datas[key].date.toLocaleDateString("en-US", { weekday: 'long', day: 'numeric', month: 'short' })
    var params = {
      professional_id: this.datas[key]["professional"]["id"],
      service_id: this.datas[key]["service"]["id"],
      salon_id: this.datas[key]["service"]["salon_id"],
      year: this.datas[key].date.toLocaleDateString("en-US", { year: 'numeric'}),
      month: this.datas[key].date.toLocaleDateString("en-US", { month: 'long' }),
      date: this.datas[key].date.toLocaleDateString("en-US", { day: 'numeric' }),
      day: this.datas[key].date.toLocaleDateString("en-US", { weekday: 'long' })
    }
    this.http.post(this.apiUrl+"appointment/time-list", JSON.stringify(params), this.httpOptions)
    .subscribe(res => {
      console.log(res);
      if(res["status"] == 200){
        this.datas[key]['time_list'] = res["data"];
      }
    }, (err) => {
      console.log(err);
    });
  };

  setTime(time, key){
    this.datas[key].time = time.start;
    this.datas[key].time_done = time.end;
  }

  setTip(tip){
    this.tip = tip;
    if(tip == "none"){
      this.total_price = this.orginal_price;
      this.tip_price = 0;
    }else{
      this.tip_price = this.orginal_price*tip/100;
      this.total_price = Number(this.orginal_price) + Number(this.tip_price);
    }
  }

  nextStep(){
    var time = true;
    var date = true;
    for(var key in this.datas){
      if(this.datas[key].time == ""){
        time = false;
        break;
      }
      if(this.datas[key].date < new Date()){
        date = false
      }
    }
    
    if(time && date){
      for(var key in this.datas){
        this.datas[key].editable = false;
      }
      if(!this.isSetTime){
        this.isSetTime = true;
      }else{
        this.title = 'Payment Information';
        this.payable = true;
      }
    }else if(!date){
      this.toastMessage("Please select available date. Cannot select past date.")
    }else{
      this.toastMessage("Please select time.")
    }
  }
  
  async visaPay(){
    this.stripe.setPublishableKey('pk_test_51JwyVGEDfScRvyn3VD4lrKiNBkdBVvFZjV1XKQeKcBWBUr6Yp9kAIf3dsqWmeXLLkCeufUJmTuVGFlY95Kirakv300Czfe5zDT');
    // this.stripe.setPublishableKey('pk_live_51JwyVGEDfScRvyn3j8YQM4l9uTTKZlz0TLWacwe9eXH7mc5KDBlVSk99nuoL8BhQDb7N0dtNpGRy0ayilZ7p2v3R00ODJoMc4F');
    var token = localStorage.getItem('token');
    let card;

    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      cssClass: 'loading',
      message: 'Checking...',
    });
    loading.present();

    this.http.get(this.apiUrl+"card/get-default?api_token=" + token)
    .subscribe(res => {
      if(res["status"] == 200){
        if(res["data"] != null){
          var expire = res["data"].expired_at;
          expire = expire.split("/");
          card = {
            number: res["data"].number,
            expMonth: expire[0],
            expYear: "20"+expire[1],
            cvc: res["data"].last_digit
          }
          this.stripe.createCardToken(card)
          .then((token) => {
            var params = {
              stripeToken: token.id,
              amount: this.total_price
            };
            this.http.post(this.apiUrl+"stripe-payment", JSON.stringify(params), this.httpOptions)
            .subscribe(res => {
              if(res["status"] == 200){
                if(res["data"][0].status == "succeeded"){
                  if(this.multi == false){
                    var data = {
                      api_token: localStorage.getItem('token'),
                      professional_id: this.datas[0]["professional"]["id"],
                      service_id: this.datas[0]["service"]["id"],
                      salon_id: this.datas[0]["service"]["salon_id"],
                      appointment_id: this.appointment_id,
                      year: this.datas[0]["date"].toLocaleDateString("en-US", { year: 'numeric'}),
                      month: this.datas[0]["date"].toLocaleDateString("en-US", { month: 'long' }),
                      date: this.datas[0]["date"].toLocaleDateString("en-US", { day: 'numeric' }),
                      day: this.datas[0]["date"].toLocaleDateString("en-US", { weekday: 'long' }),
                      time: this.datas[0].time,
                      price: this.orginal_price,
                      tip: this.tip_price,
                      tax: 0
                    }
                    this.http.post(this.apiUrl+"appointment/add", JSON.stringify(data), this.httpOptions)
                    .subscribe(res => {
                      loading.dismiss();
                      if(res["status"] == 200){
                        this.paymentSuccess();
                        this.modalCtrl.dismiss();
                      }else{
                        this.toastMessage("Failed to add data");
                      }
                    }, (err) => {
                      console.log(err);
                    });
                  }else{
                    let multidata = []; 
                    for(var i in this.datas){
                      let data = {
                        professional_id: this.datas[i]["professional"]["id"],
                        service_id: this.datas[i]["service"]["id"],
                        salon_id: this.datas[i]["service"]["salon_id"],
                        year: this.datas[i]["date"].toLocaleDateString("en-US", { year: 'numeric'}),
                        month: this.datas[i]["date"].toLocaleDateString("en-US", { month: 'long' }),
                        date: this.datas[i]["date"].toLocaleDateString("en-US", { day: 'numeric' }),
                        day: this.datas[i]["date"].toLocaleDateString("en-US", { weekday: 'long' }),
                        time: this.datas[i].time,
                        price: this.datas[i]["service"]["price"],
                        tip: this.tip_price,
                        tax: 0
                      }
                      multidata.push(data);
                    }
                    let requestData = {
                      api_token: localStorage.getItem('token'),
                      data: multidata
                    }
                    console.log(requestData);
                    this.http.post(this.apiUrl+"appointment/add-multi", JSON.stringify(requestData), this.httpOptions)
                    .subscribe(res => {
                      console.log(res);
                      loading.dismiss();
                      if(res["status"] == 200){
                        this.paymentSuccess();
                        this.modalCtrl.dismiss();
                      }else{
                        this.toastMessage("Failed to add data");
                      }
                    }, (err) => {
                      console.log(err);
                    });
                  }
                }
              }else{
                this.toastMessage("Failed in Stripe payment");
                loading.dismiss();
              }
            }, (err) => {
              console.log(err);
              loading.dismiss();
            });
          }).catch(error => console.log(error));
        }else{
          this.toastMessage('You set no card as a default.');
          loading.dismiss();
        }
      }else{
        this.toastMessage('You set no card as a default.')
        loading.dismiss();
      }
    }, (err) => {
      console.log(err);
      loading.dismiss();
    });   
  }

  async paymentSuccess(){
    const modal = await this.modalCtrl.create({
      component: PaymentmodalPage,
      componentProps: {datas: this.datas},
      cssClass: 'appointmodal',
      mode:'ios',
      swipeToClose:true,
      presentingElement: await this.modalCtrl.getTop()
    });
    
    return await modal.present();
  }

  close()
  {
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
