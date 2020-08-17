import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';
import { GlobalDataModel } from '../global-data.model';
import { DateWiseData } from '../datewisedata.model';
import { Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'cases' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    // { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    // { // grey
    //   backgroundColor: 'rgba(148,159,177,0.2)',
    //   borderColor: 'rgba(148,159,177,1)',
    //   pointBackgroundColor: 'rgba(148,159,177,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    // },
    // { // dark grey
    //   backgroundColor: 'rgba(77,83,96,0.2)',
    //   borderColor: 'rgba(77,83,96,1)',
    //   pointBackgroundColor: 'rgba(77,83,96,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(77,83,96,1)'
    // },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';















  constructor(private dataService1 : DataServiceService) { }
  globalData : GlobalDataModel[];
  active=0;
  confirmed=0;
  recovered=0;
  deaths=0;
  dateWiseData;
  selectedCountryData :DateWiseData[];
  label1= [];
  data1=[];
  ngOnInit(): void {
    this.dataService1.getDateWiseData().subscribe(data=>{
      // console.log(data);
      this.dateWiseData=data;
      this.selectedCountryData=this.dateWiseData['Afghanistan'];
      // console.log(this.selectedCountryData[0]);
      this.selectedCountryData.forEach(value=>{
        this.label1.push(`${value.date.getDate()}/${value.date.getMonth()+1}/${value.date.getFullYear()}`);
        this.data1.push(value.cases);
      })
      // console.log(this.data1);
      this.lineChartData=[{
        data : this.data1,
        label : 'cases'
      }];
      this.lineChartLabels=this.label1;
    })

    this.dataService1.getGlobalData().subscribe(data=>{
      this.globalData=data;
      this.globalData.splice(this.globalData.length-1,1);
      this.globalData.forEach(g=>{
        if(g.country==="Afghanistan"){
          this.active=g.active;
          this.confirmed=g.confirmed;
          this.recovered=g.recovered;
          this.deaths=g.deaths;
          // console.log(g);
        }
      })
    })
  }
  changedSelect(select){
    this.globalData.forEach(g=>{
      if(select.value==g.country){
        // console.log(g);
        this.active=g.active;
          this.confirmed=g.confirmed;
          this.recovered=g.recovered;
          this.deaths=g.deaths;
      }
    })
    this.selectedCountryData=this.dateWiseData[select.value];
    console.log(this.selectedCountryData);
    this.label1=[];
    this.data1=[];
    this.selectedCountryData.forEach(value=>{
      this.label1.push(`${value.date.getDate()}/${value.date.getMonth()+1}/${value.date.getFullYear()}`);
      this.data1.push(value.cases);
    })
    // console.log(this.data1);
    this.lineChartData=[{
      data : this.data1,
      label : 'cases'
    }];
    this.lineChartLabels=this.label1;

  }

}
