import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-insight',
  templateUrl: './insight.page.html',
  styleUrls: ['./insight.page.scss'],
})
export class InsightPage implements OnInit {
  slideOptions={
    slidesPerView: 1.3,
    spaceBetween: 10
  };
  category:any = 'trending';
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  segmentChanged(ev)
  {
    this.category = ev.detail.value;
  }

  goDetails()
  {
      this.navCtrl.navigateForward('insightdetails');
  }

}
