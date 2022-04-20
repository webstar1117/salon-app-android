import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-insightdetails',
  templateUrl: './insightdetails.page.html',
  styleUrls: ['./insightdetails.page.scss'],
})
export class InsightdetailsPage implements OnInit {
  @ViewChild('getHeight') header: ElementRef
  viewHeight: number;

  constructor(private renderr: Renderer2) { }

  ngOnInit() {
  }

  setReadMore(){
    this.viewHeight =this.header.nativeElement.offsetHeight;
    console.log( this.viewHeight)

    // this.renderr.setStyle(this.header.nativeElement, 'margin-top', '10px');
  }

}
