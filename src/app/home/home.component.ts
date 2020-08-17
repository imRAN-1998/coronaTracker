import { Component, OnInit } from '@angular/core';
import {DataServiceService} from '../services/data-service.service';
import { GlobalDataModel } from '../global-data.model';
// import { GoogleChartInterface } from 'ng2-google-charts';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
// import * as Chart from 'chart.js';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public pieChartLabels = [];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';

  public legendPosition ='below';
  

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];





  
  constructor(private dataService1 : DataServiceService,
    private router1 : Router,
    private route1 : ActivatedRoute) { 
    }
  public radio1 =[{
    name: 'confirmed',
    hint : 'c',
    flag: true
  },
  {
    name: 'recovered',
    hint : 'r',
    flag: false
  },
  {
    name: 'deaths',
    hint : 'd',
    flag: false
  },
  {
    name: 'active',
    hint : 'a',
    flag: false

  }];

  // chart11: string ='c';
  globalData:GlobalDataModel[];
  totalConfirmed: number = 0;
  totalRecovered : number= 0;
  totalDeaths : number = 0;
  totalActive: number = 0;
  dataT;
  // public pieChart: GoogleChartInterface= {
  //   chartType: 'PieChart',
  // };
  // public columnChart: GoogleChartInterface = {
  //   chartType: 'ColumnChart',
  //   // options: {'title': 'countries',
  //   //   height:500,
  //   //   width:300,
  //   //   },
  // };
  ngOnInit(): void {
    
    // this.dataService1.getGlobalData().subscribe((data : GlobalDataModel[])=>{
    //   this.globalData=data;
    //   data.forEach(row=>{
    //     if(!Number.isNaN(row.confirmed)){
    //       this.totalConfirmed += row.confirmed;
    //       this.totalActive +=row.active;
    //       this.totalDeaths +=row.deaths;
    //       this.totalRecovered +=row.recovered;
    //     }
    //   })
    //   // console.log(this.totalRecovered,this.totalDeaths,this.totalConfirmed,this.totalActive);
    //   this.initChart('c');
    // })
    this.globalData=this.dataService1.data;  
    this.globalData.forEach(row=>{
      if(!Number.isNaN(row.confirmed)){
        this.totalConfirmed += row.confirmed;
        this.totalActive +=row.active;
        this.totalDeaths +=row.deaths;
        this.totalRecovered +=row.recovered;
      }
    })
    // console.log(this.globalData);
    this.initChart('c');  
  }
  initChart(char1 :  string){
    // this.chart11=char1;
    let datatable1 =[];
    let datatable2 =[];
    // datatable1.push(['country','cases']);
    this.globalData.forEach(data=>{
      let value1: number;
      if(char1=='c'){
        if(data.confirmed>100000){
          value1=data.confirmed;
        }
      }
      if(char1=='r'){
        if(data.recovered>100000){
          value1=data.recovered;
        }
      }
      if(char1=='d'){
        if(data.deaths>10000){
          value1=data.deaths;
        }
      }
      if(char1=='a'){
        if(data.active>20000){
          value1=data.active;
        }
      }
      if(value1){
        datatable1.push(data.country);
        datatable2.push(value1);
      }
    })
    this.pieChartLabels = datatable1;
    this.pieChartData = datatable2;
    this.barChartLabels=datatable1;
    this.barChartData=[{
      data: datatable2,
      label : 'cases'
    }]
    this.dataT=datatable1;
    // console.log(datatable1);
    // console.log(datatable2);
    // console.log(char1);
  }
  func1(input  : HTMLInputElement){
    console.log(input.value);
    // this.pieChartData = [20, 100, 80, 10];
    this.initChart(input.value);
    // this.router1.navigate(['/home',input.value,'charts'],{relativeTo:this.route1});
    // setTimeout(()=>{
    //   window.location.reload();
    // },500)
  }

}
