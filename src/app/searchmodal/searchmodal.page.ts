import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-searchmodal',
  templateUrl: './searchmodal.page.html',
  styleUrls: ['./searchmodal.page.scss'],
})
export class SearchmodalPage implements OnInit {

  service: any;
  popular: any;
  salons = [];
  services = [];
  new = true;
  salon_empty = false;
  service_empty = false;
  apiUrl = 'https://hairday.app/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private http: HttpClient) { }
 
  ngOnInit() {
    this.popular = this.navParams.get('popular');
    this.service = this.navParams.get('service');
  }

  search($ev){
    var keyword = $ev.target.value
    if(keyword == ""){
      this.new = true;
    }else{
      this.new = false;
      this.http.post(this.apiUrl+"salon/search/list", JSON.stringify({param: keyword}), this.httpOptions)
      .subscribe(res => {
        if(res["status"] == 200){
          this.salons = res["data"]["salons"];
          this.services = res["data"]["services"];
        }
        if(this.salons.length == 0){
          this.salon_empty = true;
        }else{
          this.salon_empty = false;
        }
        if(this.services.length == 0){
          this.service_empty = true;
        }else{
          this.service_empty = false;

        }
      }, (err) => {
        console.log(err);
      });
    }
  }

  newSearch(){
    this.new = true;
    this.service = "";
  }

  searchResult(id, name, key){
    this.navCtrl.navigateForward('searchresult',{state: {ss_id: id, keyword: name, key: key, popular: this.popular}});
    this.modalCtrl.dismiss({close: false, ss_id: id, keyword: name, key: key});
  }

  close()
  {
    this.modalCtrl.dismiss({close: true});
  }

  

}
