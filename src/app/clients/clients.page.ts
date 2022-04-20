import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  salon_id: any = 1;
  clients: any;
  results: any;

  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private router: Router,
    private http: HttpClient) { }
 
  ngOnInit() { 
    var params = this.router.getCurrentNavigation().extras.state;
    if(params){
      this.salon_id = params.salon_id;
    }
   }

  ionViewWillEnter(): void{
    this.http.get(this.apiUrl+"business/get-clients?salon_id="+this.salon_id)
    .subscribe(res => {
      if(res["status"] == 200){
        this.clients = res["data"];
        this.results = res["data"];
      }
    }, (err) => {
      console.log(err);
    });
  }

  search($ev){
    var keyword = $ev.target.value;
    console.log(this.results);
    var results = {};
    for(var i in this.clients){
      var clients = [];
      for(var j in this.clients[i]){
        if(this.clients[i][j].first_name.toLowerCase().indexOf(keyword.toLowerCase()) != -1 || this.clients[i][j].last_name.toLowerCase().indexOf(keyword.toLowerCase()) != -1 || this.clients[i][j].phone.indexOf(keyword) != -1){
          clients.push(this.clients[i][j]);
        }
      }
      if(clients.length != 0)
        results[i] = clients;
    }
    this.results = results;
  }

  addClient(){
    this.navCtrl.navigateForward("addclient", {state: {salon_id: this.salon_id}});
  }
}
