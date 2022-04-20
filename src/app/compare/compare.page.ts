import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexDataLabels,
  ApexStroke,
  ApexOptions
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  dataLabels:ApexDataLabels,
  stroke:ApexStroke,
  colors:ApexOptions["colors"]
};




@Component({
  selector: 'app-compare',
  templateUrl: './compare.page.html',
  styleUrls: ['./compare.page.scss'],
})
export class ComparePage implements OnInit {

  
  filterTerm: string;
  fromCurrency:any='bitcoin';
  currencies:any;
  currentValue = 25;
  categories:any = 'trade';
  timerange:any = '15m';
  tradetype:any='bp';
  listVisible:boolean = false;
  paircats:any='all';
  series1:any;
  series2:any;
  series3:any;
  series4:any;
  



  @ViewChild("chart", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  public activeOptionButton = "all";

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.chartOptions = {
      series: [
        {
            name: "BTC",
            data: this.generateDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(),20,
              {
                min: 10,
                max: 60
              }
            )
        },
        {
            name: 'META',
            data: this.generateDayWiseTimeSeries(
              new Date("11 Feb 2017 GMT").getTime(),
              20,
              {
                min: 10,
                max: 40
              }
            )
        },
    ],
      
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true
      },
      stacked: false,
      },

      colors: ['#FF7324', '#FFFFFF', '#F84AC1'],
      dataLabels: {
        enabled: false
      },
      
      title: {
       
        align: "left"
      },
      tooltip: {
        enabled: true
      },

      stroke: {
        curve: "smooth",
        width: 1,
      },

      
      xaxis: {
        type: "datetime",
         labels:
        {
          
          style: {
              colors: 'white',
              fontSize: '10px',
              fontFamily: 'CSMedium',
              fontWeight: 100,
              cssClass: 'apexcharts-xaxis-label',
          },
        },
      },
      yaxis: {
        opposite: true,
        tooltip: {
          enabled: false
        },
        labels:
        {
          formatter: (value) => { return  '$'+value },
          style: {
              colors: 'white',
              fontSize: '10px',
              fontFamily: 'CSMedium',
              fontWeight: 100,
              cssClass: 'apexcharts-xaxis-label',
          },
        },
      }
    };
  }


  public generateDayWiseTimeSeries = function(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = baseval;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  };


  regen()
  {
    this.chartOptions = {
      series: [
        {
            name: "BTC",
            data: this.generateDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(),20,
              {
                min: 10,
                max: 60
              }
            )
        },
        {
            name: 'META',
            data: this.generateDayWiseTimeSeries(
              new Date("11 Feb 2017 GMT").getTime(),
              20,
              {
                min: 10,
                max: 40
              }
            )
        },
    ],
      
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true
      },
      stacked: false,
      },

      colors: ['#FF7324', '#FFFFFF', '#F84AC1'],
      dataLabels: {
        enabled: false
      },
      
      title: {
       
        align: "left"
      },
      tooltip: {
        enabled: true
      },

      stroke: {
        curve: "smooth",
        width: 2,
      },

      
      xaxis: {
        type: "datetime",
         labels:
        {
          
          style: {
              colors: 'white',
              fontSize: '10px',
              fontFamily: 'CSMedium',
              fontWeight: 100,
              cssClass: 'apexcharts-xaxis-label',
          },
        },
      },
      yaxis: {
        opposite: true,
        tooltip: {
          enabled: false
        },
        labels:
        {
          formatter: (value) => { return  '$'+value },
          style: {
              colors: 'white',
              fontSize: '10px',
              fontFamily: 'CSMedium',
              fontWeight: 100,
              cssClass: 'apexcharts-xaxis-label',
          },
        },
      }
    };
  }


  changeChart(ev)
  {
    this.timerange = ev.detail.value;
    console.log(this.timerange);
    this.regen();
  }

  goBuy()
  {
    this.navCtrl.navigateForward('buy');
  }

  



}
